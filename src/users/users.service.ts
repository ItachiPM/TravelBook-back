import { Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { jsonResponse } from '../utils/jsonResponse';
import { JsonResponse, JsonResponseStatus } from '../../types';
import { EditUserDto } from './dto/editUser.dto';

@Injectable()
export class UsersService {
  async getUser(id: string): Promise<JsonResponse> {
    const user: UsersEntity = await UsersEntity.findOne({
      where: { id },
    });

    return jsonResponse({
      code: 200,
      status: JsonResponseStatus.success,
      message: 'Users was successfully found.',
      data: {
        user: user as UsersEntity,
      },
    });
  }

  async deleteUser(id: string): Promise<JsonResponse> {
    await UsersEntity.delete({ id });

    return jsonResponse({
      code: 200,
      status: JsonResponseStatus.success,
      message: 'Users was successfully deleted.',
      data: {},
    });
  }

  async editUser(editUser: EditUserDto): Promise<JsonResponse> {
    const { id, email, description, firstname, lastname } = editUser;
    const user: UsersEntity = await UsersEntity.findOne({
      where: { id },
    });

    user.email = email;
    user.description = description;
    user.firstname = firstname;
    user.lastname = lastname;

    await user.save();

    return jsonResponse({
      code: 200,
      status: JsonResponseStatus.success,
      message: 'Users was successfully edited.',
      data: {
        user: user as UsersEntity,
      },
    });
  }

  async getAll(): Promise<JsonResponse> {
    const users: UsersEntity[] = await UsersEntity.find();

    return jsonResponse({
      code: 200,
      status: JsonResponseStatus.success,
      message: 'Users was successfully found.',
      data: {
        users: users,
      },
    });
  }
}
