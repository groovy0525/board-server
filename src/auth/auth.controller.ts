import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-user.dto';
import { JwtRefreshAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() signInUserDto: SignInUserDto, @Res() res: Response) {
    const { access_token, refresh_token, user } = await this.authService.signIn(
      signInUserDto,
    );

    res.cookie('refresh_token', refresh_token, { httpOnly: true });

    return res.json({
      user,
      access_token,
    });
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('sign-out')
  async signOut(@Res() res: Response) {
    res.cookie('refresh_token', null, { httpOnly: true, maxAge: 0 });

    return res.json({
      message: '로그아웃이 완료되었습니다.',
    });
  }
}
