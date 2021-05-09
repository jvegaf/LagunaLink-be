import { MotherCreator } from './MotherCreator';
import { DateValueObject } from '../../../../src/Contexts/Shared/domain/value-object/DateValueObject';

export class FutureDateMother extends DateValueObject {
  static create(value: string) {
    return new this(value);
  }

  static random(): DateValueObject {
    const today = new Date(Date.now());
    const futDate = new Date();
    futDate.setDate(today.getDate() + 90);
    const value = MotherCreator.random().date.between(today, futDate).toString();
    return this.create(value);
  }
}
