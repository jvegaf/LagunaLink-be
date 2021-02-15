import { WordMother } from '../../../Shared/domain/WordMother';
import { JobOpenTitle } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenTitle';

export class JobOpenTitleMother {
  static create(value: string): JobOpenTitle {
    return new JobOpenTitle(value);
  }

  static random(): JobOpenTitle {
    return this.create(WordMother.random());
  }
}
