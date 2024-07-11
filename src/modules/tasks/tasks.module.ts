import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  exports: [TasksService],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
