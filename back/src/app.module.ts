import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
export class AppModule {}
