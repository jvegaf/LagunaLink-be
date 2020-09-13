import { StudentName } from '../../../../../src/Contexts/LLBE/Students/domain/StudentName';
import { StudentSurname } from '../../../../../src/Contexts/LLBE/Students/domain/StudentSurname';
import { WordMother } from '../../../Shared/domain/WordMother';

export class StudentSurnameMother {
  static create(value: string): StudentSurname {
    return new StudentSurname(value);
  }

  static random(): StudentSurname {
    return this.create(WordMother.random());
  }
}
