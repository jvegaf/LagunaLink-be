import { CourseDuration } from '../../../../../src/Contexts/LLBE/Students/domain/StudentSurname';
import { WordMother } from '../../../Shared/domain/WordMother';

export class CourseDurationMother {
  static create(value: string): CourseDuration {
    return new CourseDuration(value);
  }

  static random(): CourseDuration {
    return this.create(WordMother.random());
  }
}
