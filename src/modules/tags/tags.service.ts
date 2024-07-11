import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';
import { CreateTagRequestDto } from './dtos/requests/create-tag.request.dto';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { GetTagResponseDto } from './dtos/responses/get-tag.response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TagsService {
  constructor(
    @Inject('TAG_REPOSITORY') private readonly tagRepository: Repository<Tag>,
    private readonly tasksService: TasksService,
  ) {}

  async create(
    body: CreateTagRequestDto,
    userId: number,
  ): Promise<GetTagResponseDto> {
    const task = await this.tasksService.findOneAndEnsureExistById(body.taskId);

    if (task.createdBy.id !== userId) {
      throw new ForbiddenException('You are not allowed to tag this task');
    }

    try {
      const tag = await this.tagRepository.save({
        name: body.name,
        task,
      });

      return plainToClass(GetTagResponseDto, tag, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while creating the tag',
      );
    }
  }
}
