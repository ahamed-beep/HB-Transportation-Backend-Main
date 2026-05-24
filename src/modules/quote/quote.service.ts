import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Quote, QuoteDocument } from './entities/quote.schema';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteStatus } from './enums/quote-status.enum';
import { IQuoteService } from './interfaces/quote.interface';
import { MailService } from '../../shared/mail/mail.service';
import { userQuoteTemplate } from './templates/user-quote.template';
import { adminQuoteTemplate } from './templates/admin-quote.template';

@Injectable()
export class QuoteService implements IQuoteService {
  constructor(
    @InjectModel(Quote.name) private quoteModel: Model<QuoteDocument>,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateQuoteDto): Promise<QuoteDocument> {
    try {
      const quote = await this.quoteModel.create(dto);
      await Promise.all([
        this.mailService.sendMail({
          to: dto.email,
          subject: 'Your Quote Request Has Been Received — HB Transportation',
          html: userQuoteTemplate(dto),
        }),
        this.mailService.sendMail({
          to: this.configService.get<string>('SMTP_USER') as string,
          subject: `New Quote Request from ${dto.fullName} — ${dto.company}`,
          html: adminQuoteTemplate(dto),
        }),
      ]);
      return quote;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(`Failed to submit quote: ${message}`);
    }
  }

async findAll(): Promise<QuoteDocument[]> {
  try {
    const quotes = await this.quoteModel.find().sort({ createdAt: -1 }).lean();
    return quotes.map((q) => ({ ...q, id: q._id.toString() })) as unknown as QuoteDocument[];
  } catch {
    throw new InternalServerErrorException('Failed to fetch quotes');
  }
}

async findOne(id: string): Promise<QuoteDocument> {
  try {
    const quote = await this.quoteModel.findById(id).lean();
    if (!quote) throw new NotFoundException('Quote not found');
    return { ...quote, id: quote._id.toString() } as unknown as QuoteDocument;
  } catch (error: unknown) {
    if (error instanceof NotFoundException) throw error;
    throw new InternalServerErrorException('Failed to fetch quote');
  }
}

async markAsRead(id: string): Promise<QuoteDocument> {
  try {
    const quote = await this.quoteModel
      .findByIdAndUpdate(id, { status: QuoteStatus.READ }, { returnDocument: 'after' })
      .lean();
    if (!quote) throw new NotFoundException('Quote not found');
    return { ...quote, id: quote._id.toString() } as unknown as QuoteDocument;
  } catch (error: unknown) {
    if (error instanceof NotFoundException) throw error;
    throw new InternalServerErrorException('Failed to update quote status');
  }
}

  async remove(id: string): Promise<{ message: string }> {
    try {
      const quote = await this.quoteModel.findByIdAndDelete(id).exec();
      if (!quote) throw new NotFoundException('Quote not found');
      return { message: 'Quote deleted successfully' };
    } catch (error: unknown) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete quote');
    }
  }
}