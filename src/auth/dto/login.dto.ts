import { IsEmail, IsString } from 'class-validator';
import { Login } from '../../../types/auth';

export class LoginDto implements Login {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
