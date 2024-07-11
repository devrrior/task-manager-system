import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';
import { CreateCommentRequestDto } from './dtos/requests/create-comment.request.dto';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly tasksService: TasksService,
  ) {}

  async create(body: CreateCommentRequestDto, userId: number) {
    const task = await this.tasksService.findById(body.taskId);

    if (task.createdById !== userId) {
      throw new ForbiddenException(
        'You are not allowed to comment on this task',
      );
    }

    try {
      const comment = await this.databaseService.comment.create({
        data: {
          content: body.content,
          task: {
            connect: {
              id: task.id,
            },
          },
        },
      });

      return comment;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while creating the comment',
      );
    }
  }
}
