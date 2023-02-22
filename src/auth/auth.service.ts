import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInUserDto } from './dto/sign-user.dto';

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

    // jwt 생성
  }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
