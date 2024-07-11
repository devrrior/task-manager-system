import {
  ForbiddenException,
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
import { GetTaskResponseDto } from './dtos/responses/get-task.response.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { CreateTaskResponseDto } from './dtos/responses/create-task.response.dto';
import { GetTaskDetailsResponseDto } from './dtos/responses/get-task-details.response.dto';
import { UpdateTaskRequestDto } from './dtos/requests/update-task.request.dto';
import { UpdateTaskResponseDto } from './dtos/responses/update-task.response.dto';
import { LogsService } from '../logs/logs.service';
import { TaskAction } from '../logs/enums/task-action.enum';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly taskRepository: Repository<Task>,
    private readonly usersService: UsersService,
    private readonly logsService: LogsService,
  ) {}

  async create(
    body: CreateTaskRequestDto,
    userId: number,
  ): Promise<CreateTaskResponseDto> {
    const user = await this.usersService.findOneAndEnsureExistById(userId);

    try {
      const task = await this.taskRepository.save({
        title: body.title,
        description: body.description,
        status: body.status,
        dueDate: new Date(body.dueDate),
        createdBy: user,
      });

      await this.logsService.create(TaskAction.CREATE, user, task);

      return plainToClass(CreateTaskResponseDto, task, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while creating the task',
      );
    }
  }

  async findOneById(
    taskId: number,
    userId: number,
  ): Promise<GetTaskDetailsResponseDto> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, isDeleted: false },
      relations: ['tags', 'comments', 'createdBy'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.createdBy.id !== userId) {
      throw new ForbiddenException('You are not allowed to view this task');
    }

    await this.logsService.create(TaskAction.GET_DETAILS, task.createdBy, task);

    return plainToInstance(GetTaskDetailsResponseDto, task, {
      excludeExtraneousValues: true,
    });
  }

  async findAllPaginated(
    userId: number,
    pageNumber: number = 1,
    pageSize: number = 10,
  ): Promise<PaginationResponseDto<GetTaskResponseDto>> {
    const user = await this.usersService.findOneAndEnsureExistById(userId);
    const skip = (pageNumber - 1) * pageSize;

    const [tasks, totalItem] = await this.taskRepository.findAndCount({
      where: {
        createdBy: {
          id: user.id,
        },
        isDeleted: false,
      },
      skip,
      take: pageSize,
    });

    const tasksResponse = tasks.map((task) => {
      return plainToClass(GetTaskResponseDto, task, {
        excludeExtraneousValues: true,
      });
    });

    await this.logsService.create(TaskAction.GET_ALL, user);

    return {
      items: tasksResponse,
      totalItems: totalItem,
      totalPages: Math.ceil(totalItem / pageSize),
      currentPage: pageNumber,
    };
  }

  async update(
    body: UpdateTaskRequestDto,
    taskId: number,
    userId: number,
  ): Promise<UpdateTaskResponseDto> {
    const task = await this.findOneAndEnsureExistById(taskId);

    if (task.createdBy.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this task');
    }

    try {
      const updatedTask = await this.taskRepository.save({
        ...task,
        ...body,
      });

      await this.logsService.create(TaskAction.UPDATE, task.createdBy, task);

      return plainToClass(UpdateTaskResponseDto, updatedTask, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while updating the task',
      );
    }
  }

  async delete(taskId: number, userId: number): Promise<void> {
    const task = await this.findOneAndEnsureExistById(taskId);

    if (task.createdBy.id !== userId) {
      throw new ForbiddenException('You are not allowed to delete this task');
    }

    try {
      await this.taskRepository.update({ id: taskId }, { isDeleted: true });
      await this.logsService.create(TaskAction.DELETE, task.createdBy);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'An error occurred while deleting the task',
      );
    }
  }

  async findOneAndEnsureExistById(taskId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['createdBy'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }
}
