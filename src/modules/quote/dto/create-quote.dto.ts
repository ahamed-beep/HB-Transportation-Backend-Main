import { IsString, IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  pickup: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  delivery: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  pickupDate: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  freightType: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  weight: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  temperature: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @Transform(({ value }: { value: string }) => value.trim())
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  company: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim() ?? '')
  notes?: string;
}