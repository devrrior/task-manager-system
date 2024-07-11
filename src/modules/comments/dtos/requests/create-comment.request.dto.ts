import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateCommentRequestDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  taskId: number;
}
