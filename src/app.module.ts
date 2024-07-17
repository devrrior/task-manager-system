import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './common/database/database.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './modules/comments/comments.module';
import { TagsModule } from './modules/tags/tags.module';
import { LogsModule } from './modules/logs/logs.module';
import configuration from './common/config/configuration';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    TasksModule,
    AuthModule,
    CommentsModule,
    TagsModule,
    LogsModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
