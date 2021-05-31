import { JobOpenIsActive } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenIsActive';
import { BooleanMother } from '../../../Shared/domain/BooleanMother';

export class JobOpenIsActiveMother {
  static create(value: boolean): JobOpenIsActive {
    return new JobOpenIsActive(value);
  }

  static random(): JobOpenIsActive {
    return this.create(BooleanMother.random());
  }
}
