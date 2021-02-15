import { StudentName } from '../../../../../src/Contexts/LLBE/Students/domain/StudentName';
import { PersonNameMother } from '../../../Shared/domain/PersonNameMother';

export class StudentNameMother {
  static create(value: string): StudentName {
    return new StudentName(value);
  }

  static random(): StudentName {
    return this.create(PersonNameMother.random());
  }
}
