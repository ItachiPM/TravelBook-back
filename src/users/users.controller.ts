import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { EditUserDto } from './dto/editUser.dto';
import { JsonResponse } from '../types/jsonResponse/jsonResponse';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private userService: UsersService) {}

  @Get('/all')
  @HttpCode(200)
  async getAll(): Promise<JsonResponse> {
    try {
      return this.userService.getAll();
    } catch (err) {
      throw err;
    }
  }

  @Get('/:id')
  @HttpCode(200)
  async getUser(@Param('id') id: string): Promise<JsonResponse> {
    try {
      return this.userService.getUser(id);
    } catch (err) {
      throw err;
    }
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id') id: string) {
    try {
      return this.userService.deleteUser(id);
    } catch (err) {
      throw err;
    }
  }

  @Patch()
  @HttpCode(200)
  async editUser(@Body() editUser: EditUserDto) {
    try {
      return this.userService.editUser(editUser);
    } catch (err) {
      throw err;
    }
  }
}
