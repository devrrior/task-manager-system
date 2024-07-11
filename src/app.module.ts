import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatabaseService } from './common/database/database.service';
import { DatabaseModule } from './common/database/database.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './modules/comments/comments.module';
import { TagsModule } from './modules/tags/tags.module';
import configuration from './common/config/configuration';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    TasksModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CommentsModule,
    TagsModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
