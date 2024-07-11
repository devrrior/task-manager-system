import { DataSource } from 'typeorm';
import { Task } from './entities/task.entity';

export const tasksProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: ['DATA_SOURCE'],
  },
];
