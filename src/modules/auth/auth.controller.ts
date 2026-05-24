import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../common/decorators/public.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { SerializeResponse } from 'src/common/decorators/serialize.interceptor';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @SerializeResponse(AuthResponseDto)
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  @SerializeResponse(AuthResponseDto)
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw error;
    }
  }
}