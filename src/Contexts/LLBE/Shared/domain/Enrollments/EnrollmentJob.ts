import { Enrollment } from '../../../Enrollments/domain/Enrollment';
import { JobOpenCompany } from '../JobOpenings/JobOpenCompany';
import { EnrollmentJobType } from './EnrollmentJobType';
import { EnrollmentJobDTO } from './EnrollmentJobDTO';
import { EnrollmentId } from './EnrollmentId';
import { StudentId } from '../Students/StudentId';
import { JobOpeningId } from '../JobOpenings/JobOpeningId';
import { EnrollmentDate } from '../../../Enrollments/domain/EnrollmentDate';

export class EnrollmentJob extends Enrollment {
  jobOpenDetail: JobOpenCompany;

  constructor(values: EnrollmentJobType) {
    super(values);
    this.jobOpenDetail = values.jobOpeningDetail;
  }

  static fromPrimitives(plaindata: EnrollmentJobDTO) {
    return new EnrollmentJob({
      id: new EnrollmentId(plaindata.id),
      student: new StudentId(plaindata.student),
      jobOpening: new JobOpeningId(plaindata.job_opening),
      enrollmentDate: new EnrollmentDate(plaindata.enrollment_date),
      jobOpeningDetail: JobOpenCompany.fromPrimitives(plaindata.jobDetail)
    });
  }

  toPrimitives(): EnrollmentJobDTO {
    return {...(super.toPrimitives()), jobDetail: this.jobOpenDetail.toPrimitives()};
  }

}
