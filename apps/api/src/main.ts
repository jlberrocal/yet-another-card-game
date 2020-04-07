/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  const port = +process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0', (err, address) => {
    console.log(`Listening at ${address}/${globalPrefix}`);
  });
}

bootstrap().catch(err => console.error('bootstrap error', err));
