/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Cấu hình CORS chi tiết
  app.enableCors({
    origin: true, // Hoặc chỉ định domain cụ thể: 'http://localhost:5173'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  // Cấu hình Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Chỉ cho phép các properties được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Throw error nếu có properties không được định nghĩa
      transform: true, // Tự động transform types
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const messages = errors.map(error => ({
          field: error.property,
          message: Object.values(error.constraints).join(', '),
        }));
        return new BadRequestException(messages);
      },
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();