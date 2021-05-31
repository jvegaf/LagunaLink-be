import { DateValueObject } from '../../../Shared/domain/value-object/DateValueObject';
import { Timestamp } from './Timestamp';

export class CreatedAt extends DateValueObject {
  static create(value: string) {
    return new this(value);
  }

  static now() {
    return this.create(Timestamp.now());
  }
}
