import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  private isObj(obj: unknown): obj is Record<string, unknown> {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
  }

  private trim(values: unknown): unknown {
    if (this.isObj(values)) {
      Object.keys(values).forEach((key) => {
        values[key] = this.trim(values[key]);
      });
      return values;
    } else if (Array.isArray(values)) {
      return values.map((v) => this.trim(v));
    } else if (typeof values === 'string') {
      return values.trim();
    }
    return values;
  }

  transform(values: unknown, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      return this.trim(values);
    }
    return values;
  }
}