import { EnrollmentType } from './EnrollmentType';
import { Student } from '../../../Students/domain/Student';

export type EnrollStudentType = EnrollmentType & {
  studentDetail: Student;
};
