import { StudentSurname } from '../../../../../src/Contexts/LLBE/Students/domain/StudentSurname';
import { PersonSurnameMother } from '../../../Shared/domain/PersonSurnameMother';

export class StudentSurnameMother {
  static create(value: string): StudentSurname {
    return new StudentSurname(value);
  }

  static random(): StudentSurname {
    return this.create(PersonSurnameMother.random());
  }
}
