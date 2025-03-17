import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { PasswordService } from './password/password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(data: SignUpDto) {
    const { email, password } = data;

    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new BadRequestException({ type: 'email-exists', message: 'Email already exists' });
    }

    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(password, salt);

    const newUser = await this.userService.create(email, hash, salt);

    const accessToken = await this.jwtService.signAsync({ id: newUser.id, email: newUser.email });

    return { accessToken };
  }

  signIn(data: SignInDto) {
    return data;
  }
}
