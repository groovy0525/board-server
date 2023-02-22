import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/users/entities/user.entity';

export class SignInUserDto extends PickType(User, [
  'email',
  'password',
] as const) {}
