import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TasksModule } from '../tasks/tasks.module';
import { commentsProviders } from './comments.providers';

@Module({
  imports: [TasksModule],
  controllers: [CommentsController],
  providers: [...commentsProviders, CommentsService],
})
export class CommentsModule {}
