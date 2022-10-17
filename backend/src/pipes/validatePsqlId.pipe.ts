import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PSQL_MAX } from 'src/constants/psqlConstants';

@Injectable()
export class ValidatePsqlId implements PipeTransform {
  transform(value: any) {
    if (value < PSQL_MAX) {
      return value;
    }

    throw new HttpException('Id is out of range', HttpStatus.BAD_REQUEST);
  }
}
