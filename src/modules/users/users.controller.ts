import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/requests/create-user.request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserRequestDto) {
    const data = await this.usersService.create(body);
    return {
      data,
      success: true,
      message: 'User created',
    };
  }
}
