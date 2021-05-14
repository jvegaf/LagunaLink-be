import { DateValueObject } from '../../../Shared/domain/value-object/DateValueObject';

export class CreatedAt extends DateValueObject{

  static create(value: Date) {
    return new this(value);
  }

  static now() {
    return this.create(new Date(Date.now()));
  }
}
