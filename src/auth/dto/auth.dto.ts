import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'xG9t8@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1234'
  })
  @IsNotEmpty()
  password: string;
}

export class SignInDto {
  @ApiProperty({
    example: 'xG9t8@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1234'
  })
  @IsNotEmpty()
  password: string;
}

export class GetSessionInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    example: 'xG9t8@example.com'
  })
  email: string;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  exp: number;
}
