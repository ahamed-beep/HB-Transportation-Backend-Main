import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { Quote, QuoteSchema } from './entities/quote.schema';
import { MailModule } from '../../shared/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
    MailModule,
  ],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}