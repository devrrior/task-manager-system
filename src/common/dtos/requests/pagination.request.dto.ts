import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationRequestDto {
  @IsOptional()
  @Type(() => Number)
  pageNumber: number = 1;

  @IsOptional()
  @Type(() => Number)
  pageSize: number = 10;
}
