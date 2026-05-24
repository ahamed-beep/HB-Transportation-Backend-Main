import { IsString, IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @Transform(({ value }: { value: string }) => value.trim())
  fullName: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim() ?? '')
  phone?: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  message: string;
}