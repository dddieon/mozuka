import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';
import { GiftsModule } from './gifts/gifts.module';
import { ItemsModule } from './items/items.module';
import { ResultsModule } from './results/results.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig),
    TasksModule,
    GiftsModule,
    ItemsModule,
    ResultsModule,
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
