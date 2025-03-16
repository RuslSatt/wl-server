import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GetSessionInfoDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  @Post('sign-up')
  @ApiCreatedResponse()
  signUp(@Body() body: SignUpDto) {
    return body;
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
