import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';
import { SerializeResponse } from 'src/common/decorators/serialize.interceptor';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @SerializeResponse(UserDto)
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @SerializeResponse(UserDto)
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @SerializeResponse(UserDto)
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    try {
      return await this.userService.remove(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id/toggle-status')
  async toggleStatus(@Param('id', ParseObjectIdPipe) id: string) {
    try {
      return await this.userService.toggleStatus(id);
    } catch (error) {
      throw error;
    }
  }
}