import { JobRespons } from '../../../../../src/Contexts/LLBE/Students/domain/JobRespons';
import { ParagraphMother } from '../../../Shared/domain/ParagraphMother';

export class JobResponsMother {
  static create(value: string): JobRespons {
    return new JobRespons(value);
  }

  static random(): JobRespons {
    return this.create(ParagraphMother.random());
  }
}
