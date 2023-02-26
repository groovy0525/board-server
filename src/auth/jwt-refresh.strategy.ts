import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Payload } from './payload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        return req.cookies.refresh_token;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_SECRET,
    });
  }

  async validate(payload: Payload) {
    return {
      id: payload.sub,
      nickname: payload.nickname,
      email: payload.email,
    };
  }
}
