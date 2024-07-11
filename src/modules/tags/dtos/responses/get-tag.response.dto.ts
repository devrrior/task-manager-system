import { Expose } from 'class-transformer';

export class GetTagResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
