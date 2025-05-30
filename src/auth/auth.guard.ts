import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { CookieService } from './cookie/cookie.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;

    const token = req.cookies[CookieService.tokenKey];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const session = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });

      req['session'] = session;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
