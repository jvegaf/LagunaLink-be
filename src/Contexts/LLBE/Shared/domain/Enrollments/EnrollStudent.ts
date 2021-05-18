import { Enrollment } from '../../../Enrollments/domain/Enrollment';
import { Student } from '../../../Students/domain/Student';
import { EnrollStudentType } from './EnrollStudentType';
import { EnrollStudentDTO } from './EnrollStudentDTO';
import { EnrollmentDate } from '../../../Enrollments/domain/EnrollmentDate';
import { EnrollmentId } from './EnrollmentId';
import { StudentId } from '../Students/StudentId';
import { JobOpeningId } from '../JobOpenings/JobOpeningId';

export class EnrollStudent extends Enrollment {
  readonly studentDetail: Student;

  constructor(values: EnrollStudentType) {
    super(values);
    this.studentDetail = values.studentDetail;
  }

  static fromPrimitives(plaindata: EnrollStudentDTO) {
    return new EnrollStudent({
      id: new EnrollmentId(plaindata.id),
      student: new StudentId(plaindata.student),
      jobOpening: new JobOpeningId(plaindata.job_opening),
      enrollmentDate: new EnrollmentDate(plaindata.enrollment_date),
      studentDetail: Student.fromPrimitives(plaindata.studentDetail)
    });
  }

  toPrimitives(): EnrollStudentDTO {
    return {...(super.toPrimitives()), studentDetail: this.studentDetail.toPrimitives()};
  }
}
