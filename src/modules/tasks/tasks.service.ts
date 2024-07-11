import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PaginationResponseDto } from '../../common/dtos/responses/pagination.response.dto';
import { CreateTaskRequestDto } from './dtos/requests/create-task.request.dto';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly taskRepository: Repository<Task>,
    private readonly usersService: UsersService,
  ) {}

  async create(body: CreateTaskRequestDto, userId: number): Promise<Task> {
    const user = await this.usersService.findById(userId);

    try {
      const task = await this.taskRepository.save({
        title: body.title,
        description: body.description,
        status: body.status,
        dueDate: new Date(body.dueDate),
        createdBy: user,
      });

      return task;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while creating the task',
      );
    }
  }

  async findById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async findAllPaginated(
    userId: number,
    pageNumber: number = 1,
    pageSize: number = 10,
  ): Promise<PaginationResponseDto<Task>> {
    const user = await this.usersService.findById(userId);
    const skip = (pageNumber - 1) * pageSize;

    const [tasks, totalItem] = await this.taskRepository.findAndCount({
      where: {
        createdBy: {
          id: user.id,
        },
      },
      skip,
      take: pageSize,
    });

    return {
      items: tasks,
      totalItems: totalItem,
      totalPages: Math.ceil(totalItem / pageSize),
      currentPage: pageNumber,
    };
  }
}
