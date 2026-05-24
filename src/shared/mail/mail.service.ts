import { Injectable, Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { NODEMAILER_TRANSPORTER } from './nodemailer.provider';
import { ConfigService } from '@nestjs/config';

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    @Inject(NODEMAILER_TRANSPORTER) private readonly transporter: Transporter,
    private readonly configService: ConfigService,
  ) {}

  async sendMail(options: SendMailOptions): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"${this.configService.get<string>('SMTP_FROM_NAME')}" <${this.configService.get<string>('SMTP_USER')}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
      this.logger.log(`Mail sent to ${options.to}`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Mail send failed: ${message}`);
      throw new InternalServerErrorException(`Failed to send email: ${message}`);
    }
  }
}