import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';

@Module({
  exports: [UsersService],
  controllers: [UsersController],
  providers: [...usersProviders, UsersService],
})
export class UsersModule {}
