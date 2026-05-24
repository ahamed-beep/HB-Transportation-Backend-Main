import { Expose, Transform } from 'class-transformer';
import { QuoteStatus } from '../enums/quote-status.enum';

export class QuoteResponseDto {
 @Expose()
  @Transform(({ obj }) => obj._id?.toString() ?? obj.id?.toString())
  id: string;

  @Expose()
  pickup: string;

  @Expose()
  delivery: string;

  @Expose()
  pickupDate: string;

  @Expose()
  freightType: string;

  @Expose()
  weight: string;

  @Expose()
  temperature: string;

  @Expose()
  fullName: string;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Expose()
  company: string;

  @Expose()
  notes: string;

  @Expose()
  status: QuoteStatus;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}