import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://yourdomain.com']
        : ['http://localhost:3000', 'http://localhost:4200'],
    credentials: process.env.NODE_ENV === 'production',
  });

  const config = new DocumentBuilder()
    .setTitle('Silverfort API')
    .setDescription('Backend API for Silverfort application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('APP_PORT') || 3000;
  const ip = 'localhost';

  await app.listen(port);
  logger.log(`Application is running on: http://${ip}:${port}`);

  setInterval(() => {
    logger.debug(`App is running ${ip}:${port}`);
  }, 1000);
}
bootstrap();
