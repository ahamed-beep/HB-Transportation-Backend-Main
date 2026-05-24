import { Expose, Transform } from 'class-transformer';
import { ContactStatus } from '../enums/contact-status.enum';

export class ContactResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString() ?? obj.id?.toString())
  id: string;

  @Expose() fullName: string;
  @Expose() phone: string;
  @Expose() email: string;
  @Expose() message: string;
  @Expose() status: ContactStatus;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
}