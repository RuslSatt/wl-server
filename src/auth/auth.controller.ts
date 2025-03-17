import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { GetSessionInfoDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CookieService } from './cookie/cookie.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService
  ) {}

  @Post('sign-up')
  @ApiCreatedResponse()
  async signUp(@Body() body: SignUpDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.signUp(body);

    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse()
  async signIn(@Body() body: SignInDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.signIn(body);

    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
  }

  @Get('session')
  @ApiOkResponse({
    type: GetSessionInfoDto
  })
  @UseGuards(AuthGuard)
  getSession(@Body() body: GetSessionInfoDto) {
    return body;
  }
}
