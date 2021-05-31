import { CompanyType } from './CompanyType';
import { JobOpening } from '../../../JobOpenings/domain/JobOpening';
import { Enrollment } from '../../../Enrollments/domain/Enrollment';
import { Student } from '../../../Students/domain/Student';

export type CompanyProfileType = CompanyType & {
  jobOpenings: JobOpening[];
  enrolls: Enrollment[];
  students: Student[];
};
