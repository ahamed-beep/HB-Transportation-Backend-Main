import { CreateContactDto } from '../dto/create-contact.dto';
import { ContactDocument } from '../entities/contact.schema';
import { ContactStatus } from '../enums/contact-status.enum';

export interface IContact {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  status: ContactStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContactService {
  create(dto: CreateContactDto): Promise<ContactDocument>;
  findAll(): Promise<ContactDocument[]>;
  findOne(id: string): Promise<ContactDocument>;
  markAsRead(id: string): Promise<ContactDocument>;
  remove(id: string): Promise<{ message: string }>;
}