import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from '../users/users.module';
import { tasksProviders } from './tasks.providers';

@Module({
  imports: [UsersModule],
  exports: [TasksService],
  controllers: [TasksController],
  providers: [...tasksProviders, TasksService],
})
export class TasksModule {}
