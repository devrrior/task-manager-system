import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateTokensRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(7)
  password: string;
}
