import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  setupSwagger(app);
  setupGlobalPipes(app);

  await app.listen(process.env.PORT || 3000);
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Api de blog')
    .setDescription('Es un api que sirve para un blog')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: { filter: true },
  });
}

function setupGlobalPipes(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
}

bootstrap();
