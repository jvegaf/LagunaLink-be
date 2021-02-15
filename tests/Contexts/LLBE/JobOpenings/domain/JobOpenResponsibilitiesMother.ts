import { JobOpenResponsibilities } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenResponsibilities';
import { ParagraphMother } from '../../../Shared/domain/ParagraphMother';

export class JobOpenResponsibilitiesMother {
  static create(value: string): JobOpenResponsibilities {
    return new JobOpenResponsibilities(value);
  }

  static random(): JobOpenResponsibilities {
    return this.create(ParagraphMother.random());
  }
}
