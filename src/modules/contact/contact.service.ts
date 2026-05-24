import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Contact, ContactDocument } from './entities/contact.schema';
import { ContactStatus } from './enums/contact-status.enum';
import { IContactService } from './interfaces/contact.interface';
import { MailService } from '../../shared/mail/mail.service';
import { userContactTemplate } from './templates/user-contact.template';
import { adminContactTemplate } from './templates/admin-contact.template';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService implements IContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateContactDto): Promise<ContactDocument> {
    try {
      const contact = await this.contactModel.create(dto);
      await Promise.all([
        this.mailService.sendMail({
          to: dto.email,
          subject: 'Your Message Has Been Received — HB Transportation',
          html: userContactTemplate(dto),
        }),
        this.mailService.sendMail({
          to: this.configService.get<string>('SMTP_USER') as string,
          subject: `New Contact Message from ${dto.fullName}`,
          html: adminContactTemplate(dto),
        }),
      ]);
      return contact;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(`Failed to submit message: ${message}`);
    }
  }

  async findAll(): Promise<ContactDocument[]> {
    try {
      const contacts = await this.contactModel.find().sort({ createdAt: -1 }).lean();
      return contacts.map((c) => ({ ...c, id: c._id.toString() })) as unknown as ContactDocument[];
    } catch {
      throw new InternalServerErrorException('Failed to fetch messages');
    }
  }

  async findOne(id: string): Promise<ContactDocument> {
    try {
      const contact = await this.contactModel.findById(id).lean();
      if (!contact) throw new NotFoundException('Message not found');
      return { ...contact, id: contact._id.toString() } as unknown as ContactDocument;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch message');
    }
  }

  async markAsRead(id: string): Promise<ContactDocument> {
    try {
      const contact = await this.contactModel
        .findByIdAndUpdate(id, { status: ContactStatus.READ }, { returnDocument: 'after' })
        .lean();
      if (!contact) throw new NotFoundException('Message not found');
      return { ...contact, id: contact._id.toString() } as unknown as ContactDocument;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update message status');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const contact = await this.contactModel.findByIdAndDelete(id).exec();
      if (!contact) throw new NotFoundException('Message not found');
      return { message: 'Message deleted successfully' };
    } catch (error: unknown) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete message');
    }
  }
}