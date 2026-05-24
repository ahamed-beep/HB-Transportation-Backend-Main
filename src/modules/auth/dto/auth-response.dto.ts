import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: string;
}

export class AuthResponseDto {
  @Expose()
  token: string;

  @Expose()
  user: UserResponseDto;
}