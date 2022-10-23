import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UsersEntity } from '../users/users.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class CheckUserExistByIdPipe implements PipeTransform {
  async transform(
    id: string,
    metadata: ArgumentMetadata,
  ): Promise<UsersEntity> {
    if (!isUUID(id)) {
      throw new HttpException('This ID is incorrect.', HttpStatus.BAD_REQUEST);
    }

    const user = await UsersEntity.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException(
        "User with that ID don't exist.",
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }
}
