import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', process.env.NEXT_PUBLIC_DOMAIN],
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
