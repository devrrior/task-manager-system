import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';
import { TasksService } from '../tasks/tasks.service';
import { CreateTagRequestDto } from './dtos/requests/create-tag.request.dto';

@Injectable()
export class TagsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly tasksService: TasksService,
  ) {}

  async create(body: CreateTagRequestDto, userId: number) {
    const task = await this.tasksService.findById(body.taskId);

    if (task.createdById !== userId) {
      throw new ForbiddenException('You are not allowed to tag this task');
    }

    try {
      const tag = await this.databaseService.tag.create({
        data: {
          name: body.name,
          task: {
            connect: {
              id: task.id,
            },
          },
        },
      });

      return tag;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'An error occurred while creating the tag',
      );
    }
  }
}
