import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Contact, ContactSchema } from './entities/contact.schema';
import { MailModule } from '../../shared/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    MailModule,
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}