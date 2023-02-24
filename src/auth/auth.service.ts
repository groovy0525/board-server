import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInUserDto } from './dto/sign-user.dto';
import { Payload } from './payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInUserDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnprocessableEntityException(
        '이메일 또는 비밀번호를 확인해주세요.',
      );
    }

    const isValid = await this.usersService.validatePassword(password, user);

    if (!isValid) {
      throw new UnprocessableEntityException(
        '이메일 또는 비밀번호를 확인해주세요.',
      );
    }

    const payload: Payload = {
      email: user.email,
      nickname: user.nickname,
      sub: user.id,
    };

    const access_token = this.createToken(
      payload,
      process.env.ACCESS_SECRET,
      '30m',
    );
    const refresh_token = this.createToken(
      payload,
      process.env.REFRESH_SECRET,
      '2w',
    );

    return {
      access_token,
      refresh_token,
      user: payload,
    };
  }

  createToken(payload: Payload, secret: string, expiresIn: string) {
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }
}
