import {StudentType} from './StudentType';
import {Enrollment} from '../../../Enrollments/domain/Enrollment';
import {JobOpening} from '../../../JobOpenings/domain/JobOpening';

export type StudentProfileType = StudentType & {
  enrolls: Enrollment[];
  jobOpenings: JobOpening[];
};
