import { IsEmail, IsString, MaxLength } from 'class-validator';

export class NewUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MaxLength(50, {
    message: 'lastname should have maximum 50 characters',
  })
  firstname: string;

  @IsString()
  @MaxLength(50, {
    message: 'lastname should have maximum 50 characters',
  })
  lastname: string;

  @IsString()
  password: string;
}
