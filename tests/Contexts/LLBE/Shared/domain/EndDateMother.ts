import { EndDate } from '../../../../../src/Contexts/LLBE/Shared/domain/EndDate';
import { PastDateMother } from '../../../Shared/domain/PastDateMother';

// TODO: FIX the end date maybe later than start date
export class EndDateMother {
  static create(value: string): EndDate {
    return new EndDate(value);
  }

  static random(): EndDate {
    return this.create(PastDateMother.random().toISOString().substr(0, 7));
  }
}
