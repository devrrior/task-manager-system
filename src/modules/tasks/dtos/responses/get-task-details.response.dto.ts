import { Expose, Type } from 'class-transformer';
import { GetCommentResponseDto } from 'src/modules/comments/dtos/responses/get-comment.response.dto';
import { GetTagResponseDto } from 'src/modules/tags/dtos/responses/get-tag.response.dto';

export class GetTaskDetailsResponseDto {
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

  @Expose()
  @Type(() => GetCommentResponseDto)
  comments: GetCommentResponseDto[];

  @Expose()
  @Type(() => GetTagResponseDto)
  tags: GetTagResponseDto[];
}
