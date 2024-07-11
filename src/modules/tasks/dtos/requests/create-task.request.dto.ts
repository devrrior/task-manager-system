import { TaskStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

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
