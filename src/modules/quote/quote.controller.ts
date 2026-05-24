import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteResponseDto } from './dto/quote-response.dto';
import { SerializeResponse } from '../../common/decorators/serialize.interceptor';
import { Public } from '../../common/decorators/public.decorator';
import { RequireRole } from '../../common/decorators/roles.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';

@Controller('quotes')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Public()
  @Post()
  @SerializeResponse(QuoteResponseDto)
  async create(@Body() createQuoteDto: CreateQuoteDto) {
    try {
      return await this.quoteService.create(createQuoteDto);
    } catch (error: unknown) {
      throw error;
    }
  }

  @Get()
  @RequireRole('admin')
  @SerializeResponse(QuoteResponseDto)
  async findAll() {
    try {
      return await this.quoteService.findAll();
    } catch (error: unknown) {
      throw error;
    }
  }

  @Get(':id')
  @RequireRole('admin')
  @SerializeResponse(QuoteResponseDto)
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    try {
      return await this.quoteService.findOne(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  @Patch(':id/read')
  @RequireRole('admin')
  @SerializeResponse(QuoteResponseDto)
  async markAsRead(@Param('id', ParseObjectIdPipe) id: string) {
    try {
      return await this.quoteService.markAsRead(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  @Delete(':id')
  @RequireRole('admin')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    try {
      return await this.quoteService.remove(id);
    } catch (error: unknown) {
      throw error;
    }
  }
}