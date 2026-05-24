import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getDatabaseConfig = (configService: ConfigService): MongooseModuleOptions => ({
  uri: configService.get<string>('MONGO_URL'),
});