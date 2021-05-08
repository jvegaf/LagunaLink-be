import { FutureDateMother } from '../../../Shared/domain/FutureDateMother';
import { JobOpenHiringDate } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenHiringDate';

export class JobOpenHiringDateMother {
  static create(value: string): JobOpenHiringDate {
    return new JobOpenHiringDate(value);
  }

  static random(): JobOpenHiringDate {
    return this.create(FutureDateMother.random().toString().substr(0, 10));
  }
}
