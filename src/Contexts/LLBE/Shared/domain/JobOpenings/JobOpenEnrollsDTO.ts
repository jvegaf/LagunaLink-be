import { JobOpeningDTO } from './JobOpeningDTO';
import { EnrollStudentDTO } from '../Enrollments/EnrollStudentDTO';

export type JobOpenEnrollsDTO = JobOpeningDTO & {
  enrolls: EnrollStudentDTO[];
};
