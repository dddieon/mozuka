import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return this.configService.get('DB_PASSWORD');
    //process.env.DB_PASSWORD 대신 configService 를 쓰는 편 (외부객체 의존x)
  }
}
