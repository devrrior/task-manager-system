import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TasksModule } from '../tasks/tasks.module';
import { tagProviders } from './tags.providers';

@Module({
  imports: [TasksModule],
  controllers: [TagsController],
  providers: [...tagProviders, TagsService],
})
export class TagsModule {}
