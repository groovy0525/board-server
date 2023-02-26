import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postsService: PostsService,
  ) {}

  async createComment(
    postId: number,
    { content }: CreateCommentDto,
    user: User,
  ) {
    const post = await this.postsService.findOne(postId);

    if (!post) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }

    const comment = new Comment();
    comment.content = content;
    comment.user = user;
    comment.post = post;

    await this.commentRepository.save(comment);

    return '댓글 생성 성공';
  }
}
