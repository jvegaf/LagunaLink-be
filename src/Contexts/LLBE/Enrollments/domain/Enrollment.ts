import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { EnrollmentDate } from './EnrollmentDate';
import { JobOpeningId } from '../../Shared/domain/JobOpenings/JobOpeningId';
import { EnrollmentId } from '../../Shared/domain/Enrollments/EnrollmentId';
import { StudentId } from '../../Shared/domain/Students/StudentId';
import { EnrollmentDTO } from '../../Shared/domain/Enrollments/EnrollmentDTO';
import { EnrollmentType } from '../../Shared/domain/Enrollments/EnrollmentType';

export class Enrollment extends AggregateRoot {
  readonly id: EnrollmentId;
  readonly student: StudentId;
  readonly jobOpening: JobOpeningId;
  readonly enrollmentDate: EnrollmentDate;

  constructor(enroll: EnrollmentType) {
    super();
    this.id = enroll.id;
    this.student = enroll.student;
    this.jobOpening = enroll.jobOpening;
    this.enrollmentDate = enroll.enrollmentDate;
  }

  static create(data: EnrollmentType): Enrollment {
    return new Enrollment(data);
  }

  static fromPrimitives(plaindata: EnrollmentDTO) {
    return new Enrollment({
      id: new EnrollmentId(plaindata.id),
      student: new StudentId(plaindata.student),
      jobOpening: new JobOpeningId(plaindata.job_opening),
      enrollmentDate: new EnrollmentDate(plaindata.enrollment_date),
    });
  }

  toPrimitives(): EnrollmentDTO {
    return {
      id: this.id.value,
      student: this.student.value,
      job_opening: this.jobOpening.value,
      enrollment_date: this.enrollmentDate.toString(),
    };
  }
}
