import { DateValueObject } from '../../../Shared/domain/value-object/DateValueObject';

export class UpdatedAt extends DateValueObject{

  constructor(value: Date) {
    super(value);
  }

  static now() {
    return new UpdatedAt(new Date(Date.now()));
  }
}
