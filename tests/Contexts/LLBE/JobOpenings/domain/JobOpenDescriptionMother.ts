import { JobOpenDescription } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenDescription';
import { JobDescriptionMother } from '../../../Shared/domain/JobDescriptionMother';

export class JobOpenDescriptionMother {
  static create(value: string): JobOpenDescription {
    return new JobOpenDescription(value);
  }

  static random(): JobOpenDescription {
    return this.create(JobDescriptionMother.random());
  }
}
