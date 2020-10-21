import { EnrollmentDate } from '../../../../../src/Contexts/LLBE/Enrollments/domain/EnrollmentDate';
import { DateMother } from '../../../Shared/domain/DateMother';

export class EnrollmentDateMother {
  static create(value: string): EnrollmentDate {
    return new EnrollmentDate(value);
  }

  static random(): EnrollmentDate {
    return this.create(DateMother.random().toISOString().substr(0, 10));
  }
}
