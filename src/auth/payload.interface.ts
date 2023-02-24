export interface Payload {
  sub: number;
  email: string;
  nickname: string;
  iat?: number;
  exp?: number;
}
