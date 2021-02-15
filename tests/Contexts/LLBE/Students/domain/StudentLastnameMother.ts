import { StudentLastname } from '../../../../../src/Contexts/LLBE/Students/domain/StudentLastname';
import { PersonSurnameMother } from '../../../Shared/domain/PersonSurnameMother';

export class StudentLastnameMother {
  static create(value: string): StudentLastname {
    return new StudentLastname(value);
  }

  static random(): StudentLastname {
    return this.create(PersonSurnameMother.random());
  }
}
