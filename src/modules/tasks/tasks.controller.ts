import { Controller, Get, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    const pageNumber = page ? parseInt(page.toString(), 10) : 1;
    const size = pageSize ? parseInt(pageSize.toString(), 10) : 10;

    const data = await this.tasksService.findAll(pageNumber, size);

    return {
      data,
      success: true,
      message: 'Tasks retrieved',
    };
  }
}
