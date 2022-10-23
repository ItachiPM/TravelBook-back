import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const userObj = createParamDecorator(
  (data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);
