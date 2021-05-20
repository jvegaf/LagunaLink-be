import {JobOpeningDTO} from '../JobOpenings/JobOpeningDTO';
import {EnrollmentDTO} from '../Enrollments/EnrollmentDTO';
import {StudentDTO} from './StudentDTO';

export type StudentProfileDTO = StudentDTO & {
  enrolls: EnrollmentDTO[];
  jobOpenings: JobOpeningDTO[];
};
