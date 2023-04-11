import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JwtToken = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.token; // extract token from request
});
