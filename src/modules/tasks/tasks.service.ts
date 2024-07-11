import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';
import { PaginationResponseDto } from '../../common/dtos/responses/pagination.response.dto';
import { Task } from '@prisma/client';
import { CreateTaskRequestDto } from './dtos/requests/create-task.request.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly usersService: UsersService,
  ) {}

  async create(body: CreateTaskRequestDto, userId: number): Promise<Task> {
    const user = await this.usersService.findById(userId);

    try {
      const task = await this.databaseService.task.create({
        data: {
          title: body.title,
          description: body.description,
          status: body.status,
          dueDate: new Date(body.dueDate),
          createdBy: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return task;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while creating the task',
      );
    }
  }

  async findById(id: number): Promise<Task> {
    const task = await this.databaseService.task.findUnique({
      where: {
        id,
      },
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
    console.log(pageNumber);
    const skip = (pageNumber - 1) * pageSize;

    const tasks = await this.databaseService.task.findMany({
      where: {
        createdById: userId,
      },
      skip,
      take: pageSize,
    });

    const totalItem = await this.databaseService.task.count();

    return {
      items: tasks,
      totalItems: totalItem,
      totalPages: Math.ceil(totalItem / pageSize),
      currentPage: pageNumber,
    };
  }
}
