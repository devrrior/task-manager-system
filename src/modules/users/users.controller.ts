import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/requests/create-user.request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() request: CreateUserRequestDto) {
    const data = await this.usersService.create(request);
    return {
      data,
      success: true,
      message: 'User created',
    };
  }
}
