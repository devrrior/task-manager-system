import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatabaseService } from './common/database/database.service';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
