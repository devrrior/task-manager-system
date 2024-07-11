import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTagRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  taskId: number;
}
