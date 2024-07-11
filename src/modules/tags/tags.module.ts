import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
