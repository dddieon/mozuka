import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  app.enableCors({
    origin: process.env.NEXT_PUBLIC_DOMAIN,
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  const port = process.env.PORT || 3000;
  console.log(process.env.NODE_ENV, ' ======================== NODE_ENV');
  await app.listen(port);
  console.log(`listening on port ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
