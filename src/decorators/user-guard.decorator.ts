import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersEntity } from '../users/users.entity';
import { Role } from '../../types';

export const userGuard = createParamDecorator(
  (data, context: ExecutionContext) => {
    const user: UsersEntity = context.switchToHttp().getRequest().user;
    if (user.role === Role.User) {
      return user;
    } else {
      throw new Error('Unauthorized');
    }
  },
);
