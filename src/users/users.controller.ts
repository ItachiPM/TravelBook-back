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

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private userService: UsersService) {}

  @Get('/:id')
  @HttpCode(200)
  async getUser(@Param('id') id: string): Promise<void> {
    try {
      await this.userService.getUser(id);
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
  @HttpCode(201)
  async editUser(@Body() editUser: EditUserDto) {
    try {
      return this.userService.editUser(editUser);
    } catch (err) {
      throw err;
    }
  }
}
