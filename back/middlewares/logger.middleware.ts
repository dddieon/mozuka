import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// router보다 먼저 실행되는 미들웨어
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // implements: 강제성 - 해당 인터페이스에 있는 프로퍼티 및 메소드를 전부 가지고 있거나 구현 필요
  private logger = new Logger('HTTP'); // context 기능: 로그종류를 구별

  use(request: Request, response: Response, next: NextFunction): void {
    // express 객체

    //실행순서 --- 1
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    //실행순서 --- 3 (비동기)
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength}- ${userAgent} ${ip}`,
      );
    });

    // 실행순서 --- 2
    next();
  }
}
