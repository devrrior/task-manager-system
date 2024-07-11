import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateTagRequestDto } from './dtos/requests/create-tag.request.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body: CreateTagRequestDto, @Request() req: Request) {
    const userId = req['user'].id;
    const data = await this.tagsService.create(body, userId);

    return {
      data,
      success: true,
      message: 'Tag created successfully',
    };
  }
}
