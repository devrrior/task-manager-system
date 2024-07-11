import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateCommentRequestDto } from './dtos/requests/create-comment.request.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body: CreateCommentRequestDto, @Request() req: Request) {
    const userId = req['user'].id;

    const data = await this.commentsService.create(body, userId);
    return {
      data,
      success: true,
      message: 'Comment created',
    };
  }
}
