import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { getDatabaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { QuoteModule } from './modules/quote/quote.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    AuthModule,
    UserModule,
    QuoteModule,
    ContactModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}