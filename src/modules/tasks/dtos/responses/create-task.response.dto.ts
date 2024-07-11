import { Expose } from 'class-transformer';

export class CreateTaskResponseDto {
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
