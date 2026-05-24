import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './entities/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    try {
      return await this.userModel.find().select('-password');
    } catch (error) {
      throw new InternalServerErrorException('Error fetching users');
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id).select('-password');
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching user');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      const user = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .select('-password');

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return { message: 'User deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting user');
    }
  }

  async toggleStatus(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.isDisabled = !user.isDisabled;
      await user.save();

      return { message: `User ${user.isDisabled ? 'disabled' : 'enabled'} successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error toggling user status');
    }
  }
}