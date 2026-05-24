import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { SerializeResponse } from '../../common/decorators/serialize.interceptor';
import { Public } from '../../common/decorators/public.decorator';
import { RequireRole } from '../../common/decorators/roles.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';
import { ContactResponseDto } from './dto/contact-response.dto';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Post()
  @SerializeResponse(ContactResponseDto)
  async create(@Body() createContactDto: CreateContactDto) {
    try {
      return await this.contactService.create(createContactDto);
    } catch (error: unknown) {
      throw error;
    }
  }

  @Get()
  @RequireRole('admin')
  @SerializeResponse(ContactResponseDto)
  async findAll() {
    try {
      return await this.contactService.findAll();
    } catch (error: unknown) {
      throw error;
    }
  }

  @Get(':id')
  @RequireRole('admin')
  @SerializeResponse(ContactResponseDto)
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    try {
      return await this.contactService.findOne(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  @Patch(':id/read')
  @RequireRole('admin')
  @SerializeResponse(ContactResponseDto)
  async markAsRead(@Param('id', ParseObjectIdPipe) id: string) {
    try {
      return await this.contactService.markAsRead(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  @Delete(':id')
  @RequireRole('admin')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    try {
      return await this.contactService.remove(id);
    } catch (error: unknown) {
      throw error;
    }
  }
}