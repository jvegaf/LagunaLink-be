import { EnrollmentDTO } from './EnrollmentDTO';
import { StudentDTO } from '../Students/StudentDTO';

export type EnrollStudentDTO = EnrollmentDTO & {
  studentDetail: StudentDTO;
};
