import { Expose } from 'class-transformer';

export class UpdateTaskResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  dueDate: Date;

  @Expose()
  status: string;
}
