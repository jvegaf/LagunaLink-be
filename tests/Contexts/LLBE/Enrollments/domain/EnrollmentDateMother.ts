import { EnrollmentDate } from '../../../../../src/Contexts/LLBE/Enrollments/domain/EnrollmentDate';
import { PastDateMother } from '../../../Shared/domain/PastDateMother';

export class EnrollmentDateMother {
  static create(value: string): EnrollmentDate {
    return new EnrollmentDate(value);
  }

  static random(): EnrollmentDate {
    return this.create(PastDateMother.random().toISOString().substr(0, 10));
  }
}
