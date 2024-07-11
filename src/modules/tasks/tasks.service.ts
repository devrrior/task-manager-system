import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';
import { PaginationResponseDto } from '../../common/dtos/responses/pagination.response.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

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
