import { Task } from 'src/modules/tasks/entities/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => Task, (task) => task.comments)
  task: Task;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
