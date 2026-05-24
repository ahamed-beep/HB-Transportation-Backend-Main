import { CreateQuoteDto } from '../dto/create-quote.dto';
import { QuoteDocument } from '../entities/quote.schema';
import { QuoteStatus } from '../enums/quote-status.enum';

export interface IQuote {
  id: string;
  pickup: string;
  delivery: string;
  pickupDate: string;
  freightType: string;
  weight: string;
  temperature: string;
  fullName: string;
  phone: string;
  email: string;
  company: string;
  notes: string;
  status: QuoteStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuoteService {
  create(dto: CreateQuoteDto): Promise<QuoteDocument>;
  findAll(): Promise<QuoteDocument[]>;
  findOne(id: string): Promise<QuoteDocument>;
  markAsRead(id: string): Promise<QuoteDocument>;
  remove(id: string): Promise<{ message: string }>;
}