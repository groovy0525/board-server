import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('post/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAccessAuthGuard)
  @Post()
  async createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user,
  ) {
    return this.commentsService.createComment(postId, createCommentDto, user);
  }
}
