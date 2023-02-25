import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost({ title, content }: CreatePostDto, user: User) {
    const post = new Post();
    post.title = title;
    post.content = content;
    post.user = user;

    await this.postRepository.save(post);

    return '게시글 생성 성공';
  }
}
