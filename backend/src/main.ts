import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/filter/httpExceptionFilter';

async function bootstrap() {
  process.env.TZ = 'Asia/Seoul';

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  await app.listen(3000);
}

bootstrap();
