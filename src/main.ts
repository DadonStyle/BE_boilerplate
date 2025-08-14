import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  const ip = 'localhost';
  await app.listen(port);
  console.log(`Application is running on: http://${ip}:${port}`);

  setInterval(() => {
    console.log(`App is running ${ip}:${port}`);
  }, 1000);
}
bootstrap();
