import { StudentLastname } from '../../../../../src/Contexts/LLBE/Students/domain/StudentLastname';
import { WordMother } from '../../../Shared/domain/WordMother';

export class StudentLastnameMother {
  static create(value: string): StudentLastname {
    return new StudentLastname(value);
  }

  static random(): StudentLastname {
    return this.create(WordMother.random());
  }
}
