import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseFormatMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json;
    res.json = function (data: any) {
      const formattedData = {
        success:
          (res.statusCode ? res.statusCode >= 200 && res.statusCode < 300 : true) &&
          (data && data.response && data.response.statusCode
            ? data.response.statusCode >= 200 && data.response.statusCode < 300
            : true),
        data: data,
        message: res.locals.message,
      };
      return originalJson.call(res, formattedData);
    };
    next();
  }
}
