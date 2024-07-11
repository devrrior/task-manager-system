import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../auth/auth.guard';
import { PaginationRequestDto } from 'src/common/dtos/requests/pagination.request.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  async findAll(@Query() query: PaginationRequestDto, @Request() req: Request) {
    const userId = req['user'].id;

    const { pageNumber, pageSize } = query;

    const data = await this.tasksService.findAllPaginated(
      userId,
      pageNumber,
      pageSize,
    );

    return {
      data,
      success: true,
      message: 'Tasks retrieved',
    };
  }
}
