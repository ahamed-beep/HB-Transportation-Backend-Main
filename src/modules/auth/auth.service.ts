import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '../user/enums/user-role.enum';
import { User, UserDocument } from '../user/entities/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const { name, email, password } = registerDto;

      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        role: UserRole.ADMIN,
      });

      const token = this.generateToken(user);

      return {
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      const user = await this.userModel.findOne({ email }).select('+password');
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      if (user.isDisabled) {
        throw new UnauthorizedException('Your account has been disabled');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const token = this.generateToken(user);

      return {
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Error during login');
    }
  }

  private generateToken(user: UserDocument): string {
    const payload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }
}