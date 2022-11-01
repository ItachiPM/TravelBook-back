import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersEntity } from '../users/users.entity';
import { RegisterDto } from './dto/newUser.dto';
import { userObj } from '../decorators/user-obj.decorator';
import { CheckUserExistByIdPipe } from '../pipe/check-user-exist-by-id.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register.ts')
  @HttpCode(201)
  async register(@Body() newUser: RegisterDto) {
    try {
      return this.authService.register(newUser);
    } catch (err) {
      throw err;
    }
  }

  @Post('/auth')
  @HttpCode(200)
  async login(@Body() req: LoginDto, @Res() res: Response) {
    return this.authService.login(req, res);
  }

  @Get('/logout')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async logout(@userObj() user: UsersEntity, @Res() res: Response) {
    return this.authService.logout(user, res);
  }

  @Get('confirmRegister/:userId')
  @HttpCode(200)
  async confirmRegister(
    @Param('userId', CheckUserExistByIdPipe) user: UsersEntity,
  ) {
    try {
      return this.authService.confirmRegister(user);
    } catch (err) {
      throw err;
    }
  }
}
