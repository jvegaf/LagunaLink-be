import { DateValueObject } from '../../../Shared/domain/value-object/DateValueObject';
import { Timestamp } from './Timestamp';

export class UpdatedAt extends DateValueObject {
  constructor(value: string) {
    super(value);
  }

  static now() {
    return new UpdatedAt(Timestamp.now());
  }
}
