import { DateValueObject } from '../../../Shared/domain/value-object/DateValueObject';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export class JobOpenHiringDate extends DateValueObject {
  constructor(value: string) {
    super(value);
    this.ensureDateIsFuture(value);
  }

  private ensureDateIsFuture(value: string): void {
    const dateValue = new Date(value);
    const today = new Date(Date.now());
    if (today >= dateValue){
      throw new InvalidArgumentError('Hiring date should be future');
    }
  }
}
