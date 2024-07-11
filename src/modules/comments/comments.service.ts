import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCommentRequestDto } from './dtos/requests/create-comment.request.dto';
import { TasksService } from '../tasks/tasks.service';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private readonly commentRepository: Repository<Comment>,
    private readonly tasksService: TasksService,
  ) {}

  async create(body: CreateCommentRequestDto, userId: number) {
    const task = await this.tasksService.findById(body.taskId);

    if (task.createdBy.id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to comment on this task',
      );
    }

    try {
      const comment = await this.commentRepository.save({
        content: body.content,
        task: task,
      });

      return comment;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'An error occurred while creating the comment',
      );
    }
  }
}
