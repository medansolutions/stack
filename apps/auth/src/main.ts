import { NestFactory } from '@nestjs/core';
import { AuthModule } from './app/auth.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionFactory } from '@stack/utils';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: ExceptionFactory
    })
  )

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3333;
  await app.listen(port);
}

bootstrap();
