import { NestFactory } from '@nestjs/core';
import { AuthModule } from './app/auth.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.enableCors();
  app.use(helmet());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3333;
  await app.listen(port);
}

bootstrap();
