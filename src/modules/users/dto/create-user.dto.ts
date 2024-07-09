import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @MinLength(5)
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
