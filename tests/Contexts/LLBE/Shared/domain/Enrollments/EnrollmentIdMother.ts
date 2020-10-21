import { UuidMother } from '../../../../Shared/domain/UuidMother';
import { EnrollmentId } from '../../../../../../src/Contexts/LLBE/Shared/domain/Enrollments/EnrollmentId';

export class EnrollmentIdMother {
  static create(value: string): EnrollmentId {
    return new EnrollmentId(value);
  }

  static creator() {
    return () => EnrollmentIdMother.random();
  }

  static random(): EnrollmentId {
    return this.create(UuidMother.random());
  }
}
