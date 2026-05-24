import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/modules/user/entities/user.schema';
import { JwtPayload, RequestUser } from 'src/common/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<RequestUser> {
    if (!payload.userId) {
      throw new UnauthorizedException('Invalid token structure.');
    }

    const user = await this.userModel
      .findById(payload.userId)
      .select('-password');

    if (!user) {
      throw new UnauthorizedException('User account no longer exists.');
    }

    if (user.isDisabled) {
      throw new UnauthorizedException('Your account has been disabled.');
    }

    return {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}