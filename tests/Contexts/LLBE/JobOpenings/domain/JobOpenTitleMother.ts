import { JobOpenTitle } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenTitle';
import { JobTitleMother } from '../../../Shared/domain/JobTitleMother';

export class JobOpenTitleMother {
  static create(value: string): JobOpenTitle {
    return new JobOpenTitle(value);
  }

  static random(): JobOpenTitle {
    return this.create(JobTitleMother.random());
  }
}
