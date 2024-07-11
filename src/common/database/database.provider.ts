import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Log } from 'src/modules/logs/entities/log.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Task, Comment, Tag, Log],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
