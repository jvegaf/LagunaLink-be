import { JobOpenConditions } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenConditions';
import { ParagraphMother } from '../../../Shared/domain/ParagraphMother';

export class JobOpenConditionsMother {
  static create(value: string): JobOpenConditions {
    return new JobOpenConditions(value);
  }

  static random(): JobOpenConditions {
    return this.create(ParagraphMother.random());
  }
}
