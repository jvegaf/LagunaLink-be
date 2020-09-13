import { StudentId } from '../../../../../../src/Contexts/LLBE/Shared/domain/Students/StudentId';
import { UuidMother } from '../../../../Shared/domain/UuidMother';

export class StudentIdMother {
  static create(value: string): StudentId {
    return new StudentId(value);
  }

  static creator() {
    return () => StudentIdMother.random();
  }

  static random(): StudentId {
    return this.create(UuidMother.random());
  }
}
