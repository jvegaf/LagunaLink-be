import { EnrollmentId } from '../../../../../src/Contexts/LLBE/Shared/domain/Enrollments/EnrollmentId';
import { StudentId } from '../../../../../src/Contexts/LLBE/Shared/domain/Students/StudentId';
import { JobOpeningId } from '../../../../../src/Contexts/LLBE/Shared/domain/JobOpenings/JobOpeningId';
import { EnrollmentDate } from '../../../../../src/Contexts/LLBE/Enrollments/domain/EnrollmentDate';
import { Enrollment } from '../../../../../src/Contexts/LLBE/Enrollments/domain/Enrollment';
import { CompleteEnrollmentRequest } from '../../../../../src/Contexts/LLBE/Enrollments/application/CompleteEnrollmentRequest';
import { EnrollmentIdMother } from '../../Shared/domain/Enrollments/EnrollmentIdMother';
import { StudentIdMother } from '../../Shared/domain/Students/StudentIdMother';
import { JobOpeningIdMother } from '../../Shared/domain/JobOpenings/JobOpeningIdMother';
import { EnrollmentDateMother } from './EnrollmentDateMother';

export class EnrollmentMother {
  static create(
    id: EnrollmentId,
    student: StudentId,
    jobOpening: JobOpeningId,
    enrollmentDate: EnrollmentDate
  ): Enrollment {
    return new Enrollment(id, student, jobOpening, enrollmentDate);
  }

  static fromRequest(request: CompleteEnrollmentRequest): Enrollment {
    return this.create(
      EnrollmentIdMother.create(request.id),
      StudentIdMother.create(request.student),
      JobOpeningIdMother.create(request.job_opening),
      EnrollmentDateMother.create(request.enrollment_date)
    );
  }

  static random(): Enrollment {
    return this.create(
      EnrollmentIdMother.random(),
      StudentIdMother.random(),
      JobOpeningIdMother.random(),
      EnrollmentDateMother.random()
    );
  }

  static randomOfJobOpening(): Array<Enrollment> {
    const collection = [];
    const jobOpening = JobOpeningIdMother.random();
    for (let i = 0; i < 15; i++) {
      collection.push(
        this.create(
          EnrollmentIdMother.random(),
          StudentIdMother.random(),
          jobOpening,
          EnrollmentDateMother.random()
        )
      );
    }

    return collection;
  }
}
