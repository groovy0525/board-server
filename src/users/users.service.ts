import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ email, nickname, password }: CreateUserDto): Promise<string> {
    const existsEmail = await this.userRepository.findOne({ where: { email } });

    if (existsEmail) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }

    const existsNickname = await this.userRepository.findOne({
      where: { nickname },
    });

    if (existsNickname) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    user.nickname = nickname;

    await this.userRepository.save(user);

    return '회원가입 성공';
  }

  findOneById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
