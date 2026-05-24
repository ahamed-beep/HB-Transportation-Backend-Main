import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ContactStatus } from '../enums/contact-status.enum';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ required: true, trim: true })
  phone: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  message: string;

  @Prop({ type: String, enum: ContactStatus, default: ContactStatus.UNREAD })
  status: ContactStatus;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);