import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../auth/auth.guard';
import { PaginationRequestDto } from 'src/common/dtos/requests/pagination.request.dto';
import { CreateTaskRequestDto } from './dtos/requests/create-task.request.dto';
import { UpdateTaskRequestDto } from './dtos/requests/update-task.request.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body: CreateTaskRequestDto, @Request() req: Request) {
    const userId = req['user'].id;

    const data = await this.tasksService.create(body, userId);
    return {
      data,
      success: true,
      message: 'Task created',
    };
  }

  @Get()
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

  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: number, @Request() req: Request) {
    const userId = req['user'].id;

    const data = await this.tasksService.findOneById(id, userId);

    return {
      data,
      success: true,
      message: 'Task retrieved',
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: number,
    @Body() body: UpdateTaskRequestDto,
    @Request() req: Request,
  ) {
    const userId = req['user'].id;

    const data = await this.tasksService.update(body, id, userId);

    return {
      data,
      success: true,
      message: 'Task updated',
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: number, @Request() req: Request) {
    const userId = req['user'].id;

    await this.tasksService.delete(id, userId);

    return {
      success: true,
      message: 'Task deleted',
    };
  }
}
