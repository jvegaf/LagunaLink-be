import { CompanyDTO } from './CompanyDTO';
import { JobOpeningDTO } from '../JobOpenings/JobOpeningDTO';
import { EnrollmentDTO } from '../Enrollments/EnrollmentDTO';
import { StudentDTO } from '../Students/StudentDTO';

export type CompanyProfileDTO = CompanyDTO & {
  jobOpenings: JobOpeningDTO[];
  enrolls: EnrollmentDTO[];
  students: StudentDTO[];
};
