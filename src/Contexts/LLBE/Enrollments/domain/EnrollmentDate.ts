import { DateValueObject } from '../../../Shared/domain/value-object/DateValueObject';

export class EnrollmentDate extends DateValueObject {
  static now() {
    return new EnrollmentDate(new Date().toISOString());
  }
}
