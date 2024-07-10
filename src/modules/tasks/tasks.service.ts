import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';
import { PaginationResponseDto } from '../../common/dtos/responses/pagination.response.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PaginationResponseDto<Task>> {
    const skip = (page - 1) * pageSize;
    const tasks = await this.databaseService.task.findMany({
      skip,
      take: pageSize,
    });

    const totalItem = await this.databaseService.task.count();

    return {
      items: tasks,
      totalItems: totalItem,
      totalPages: Math.ceil(totalItem / pageSize),
      currentPage: page,
    };
  }
}
