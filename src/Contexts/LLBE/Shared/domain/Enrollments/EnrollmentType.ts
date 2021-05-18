import { EnrollmentId } from './EnrollmentId';
import { StudentId } from '../Students/StudentId';
import { JobOpeningId } from '../JobOpenings/JobOpeningId';
import { EnrollmentDate } from '../../../Enrollments/domain/EnrollmentDate';

export type EnrollmentType = {
  id: EnrollmentId;
  student: StudentId;
  jobOpening: JobOpeningId;
  enrollmentDate: EnrollmentDate;
};
