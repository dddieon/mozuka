import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '../middlewares/logger.middleware';

// const getEnv = async () => {
//   const response = await asxios.get('/비밀키 요청');
//   return response.data;
// };

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //load: [getEnv]
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})

// logger 미들웨어 추가
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
