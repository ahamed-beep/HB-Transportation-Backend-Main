import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { QuoteStatus } from '../enums/quote-status.enum';

export type QuoteDocument = Quote & Document;

@Schema({ timestamps: true })
export class Quote {
  @Prop({ required: true, trim: true })
  pickup: string;

  @Prop({ required: true, trim: true })
  delivery: string;

  @Prop({ required: true, trim: true })
  pickupDate: string;

  @Prop({ required: true, trim: true })
  freightType: string;

  @Prop({ required: true, trim: true })
  weight: string;

  @Prop({ required: true, trim: true })
  temperature: string;

  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ required: true, trim: true })
  phone: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  company: string;

  @Prop({ default: '', trim: true })
  notes: string;

  @Prop({ type: String, enum: QuoteStatus, default: QuoteStatus.UNREAD })
  status: QuoteStatus;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);