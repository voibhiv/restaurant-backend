import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
// other imports

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, res: Response, next: NextFunction) {
    const authHeader = req.header('authorization');

    if (!authHeader) {
      throw new HttpException('No auth token', HttpStatus.UNAUTHORIZED);
    }

    const bearerToken: string[] = authHeader.split(' ');
    const token: string = bearerToken[1];

    req.token = token; // request type is commented out otherwise typescript won't allow setting this

    next();
  }
}
