import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CompanyId } from '../../Shared/domain/Companies/CompanyId';
import { JobOpenResponsibilities } from './JobOpenResponsibilities';
import { JobOpenTitle } from './JobOpenTitle';
import { EnrollmentDate } from './EnrollmentDate';
import { JobOpenPosition } from './JobOpenPosition';
import { JobOpenPrevExperience } from './JobOpenPrevExperience';
import { JobOpenQualification } from './JobOpenQualification';
import { JobOpeningId } from '../../Shared/domain/JobOpenings/JobOpeningId';
import { EnrollmentId } from '../../Shared/domain/Enrollments/EnrollmentId';
import { StudentId } from '../../Shared/domain/Students/StudentId';

export class Enrollment extends AggregateRoot {
  readonly id: EnrollmentId;
  readonly student: StudentId;
  readonly jobOpening: JobOpeningId;
  readonly enrollmentDate: EnrollmentDate;

  constructor(
    id: EnrollmentId,
    student: StudentId,
    jobOpening: JobOpeningId,
    enrollmentDate: EnrollmentDate
  ) {
    super();
    this.id = id;
    this.student = student;
    this.jobOpening = jobOpening;
    this.enrollmentDate = enrollmentDate;
  }

  static create(
    id: EnrollmentId,
    student: StudentId,
    jobOpening: JobOpeningId,
    enrollmentDate: EnrollmentDate
  ): Enrollment {
    return new Enrollment(id, student, jobOpening, enrollmentDate);
  }

  static fromPrimitives(plaindata: {
    id: string;
    student: string;
    job_opening: string;
    enrollment_date: string;
  }) {
    return new Enrollment(
      new EnrollmentId(plaindata.id),
      new StudentId(plaindata.student),
      new JobOpeningId(plaindata.job_opening),
      new EnrollmentDate(plaindata.enrollment_date)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      student: this.student.value,
      job_opening: this.jobOpening.value,
      enrollment_date: this.enrollmentDate.toString(),
    };
  }
}
