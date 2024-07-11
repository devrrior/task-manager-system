import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../../enums/task-status.enum';

export class CreateTaskRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;
}
