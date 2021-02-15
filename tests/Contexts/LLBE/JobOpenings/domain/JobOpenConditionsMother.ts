import { WordMother } from '../../../Shared/domain/WordMother';
import { JobOpenConditions } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenConditions';

export class JobOpenConditionsMother {
  static create(value: string): JobOpenConditions {
    return new JobOpenConditions(value);
  }

  static random(): JobOpenConditions {
    return this.create(WordMother.random());
  }
}
