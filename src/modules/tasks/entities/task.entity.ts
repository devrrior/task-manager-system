import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskStatus } from '../enums/task-status.enum';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Log } from 'src/modules/logs/entities/log.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
  })
  status: TaskStatus;

  @Column({ name: 'due_date' })
  dueDate: Date;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @OneToMany(() => Tag, (tag) => tag.task)
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.tasks)
  createdBy: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Log, (log) => log.task)
  logs: Log[];

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;
}
