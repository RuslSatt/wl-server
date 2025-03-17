import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { GetSessionInfoDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CookieService } from './cookie/cookie.service';
import { Response } from 'express';

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
  signIn(@Body() body: SignInDto) {
    return body;
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse()
  signOut() {}

  @Get('session')
  @ApiOkResponse({
    type: GetSessionInfoDto
  })
  getSession(@Body() body: GetSessionInfoDto) {
    return body;
  }
}
