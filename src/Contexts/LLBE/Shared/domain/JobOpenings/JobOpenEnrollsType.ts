import { JobOpeningType } from './JobOpeningType';
import { EnrollStudent } from '../Enrollments/EnrollStudent';

export type JobOpenEnrollsType = JobOpeningType & {
  enrolls: EnrollStudent[];
};
