import { Expose } from 'class-transformer';

export class GetCommentResponseDto {
  @Expose()
  id: number;

  @Expose()
  content: string;
}
