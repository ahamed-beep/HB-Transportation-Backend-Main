import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export const NODEMAILER_TRANSPORTER = 'NODEMAILER_TRANSPORTER';

export const NodemailerProvider = {
  provide: NODEMAILER_TRANSPORTER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return nodemailer.createTransport({
      host: configService.get<string>('SMTP_HOST'),
      port: Number(configService.get<string>('SMTP_PORT')),
      secure: configService.get<string>('SMTP_SECURE') === 'true',
      auth: {
        user: configService.get<string>('SMTP_USER'),
        pass: configService.get<string>('SMTP_PASS'),
      },
      family: 4,
    } as nodemailer.TransportOptions);
  },
};