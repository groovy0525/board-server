import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAccessAuthGuard)
  async createPost(@Body() createPostDto: CreatePostDto, @CurrentUser() user) {
    return this.postsService.createPost(createPostDto, user);
  }
}
