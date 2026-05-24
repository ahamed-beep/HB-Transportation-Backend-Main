import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
  };

  app.enableCors(corsOptions);

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        }));
        return new BadRequestException({
          message: 'Validation failed',
          errors: messages,
        });
      },
    }),
  );

  app.setGlobalPrefix('api');

  const port = Number(configService.get<string>('PORT')) || 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}/api`);
  logger.log(`Environment: ${configService.get<string>('NODE_ENV', 'development')}`);
}
bootstrap();