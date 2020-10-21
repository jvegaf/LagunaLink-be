import { CompleteEnrollmentRequest } from '../../../../../src/Contexts/LLBE/Enrollments/application/CompleteEnrollmentRequest';
import { EnrollmentIdMother } from '../../Shared/domain/Enrollments/EnrollmentIdMother';
import { StudentIdMother } from '../../Shared/domain/Students/StudentIdMother';
import { JobOpeningIdMother } from '../../Shared/domain/JobOpenings/JobOpeningIdMother';
import { EnrollmentDateMother } from '../domain/EnrollmentDateMother';
import { CreateEnrollmentRequest } from '../../../../../src/Contexts/LLBE/Enrollments/application/CreateEnrollmentRequest';

export class EnrollmentRequestMother {
  static create(
    id: string,
    student: string,
    jobOpening: string,
    enrollmentDate: string
  ): CompleteEnrollmentRequest {
    return {
      id: id,
      student: student,
      job_opening: jobOpening,
      enrollment_date: enrollmentDate,
    };
  }

  static createRequestFromComplete(
    request: CompleteEnrollmentRequest
  ): CreateEnrollmentRequest {
    return {
      student: request.student,
      job_opening: request.job_opening,
    };
  }

  static random(): CompleteEnrollmentRequest {
    return this.create(
      EnrollmentIdMother.random().value,
      StudentIdMother.random().value,
      JobOpeningIdMother.random().value,
      EnrollmentDateMother.random().toString()
    );
  }
}
