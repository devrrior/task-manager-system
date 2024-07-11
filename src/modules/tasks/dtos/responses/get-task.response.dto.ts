import { Expose } from 'class-transformer';

export class GetTaskResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  dueDate: Date;

  @Expose()
  status: string;
}
