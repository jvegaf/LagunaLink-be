import { StudentName } from '../../../../../src/Contexts/LLBE/Students/domain/StudentName';
import { WordMother } from '../../../Shared/domain/WordMother';

export class CourseNameMother {
  static create(value: string): StudentName {
    return new StudentName(value);
  }

  static random(): StudentName {
    return this.create(WordMother.random());
  }
}
