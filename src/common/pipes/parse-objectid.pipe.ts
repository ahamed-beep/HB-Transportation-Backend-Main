import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(
        `Invalid ${metadata.data || 'ID'}: ${value}`,
      );
    }
    return new Types.ObjectId(value).toHexString();
  }
}