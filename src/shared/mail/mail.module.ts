import { Module } from '@nestjs/common';
import { NodemailerProvider } from './nodemailer.provider';
import { MailService } from './mail.service';

@Module({
  providers: [NodemailerProvider, MailService],
  exports: [MailService],
})
export class MailModule {}