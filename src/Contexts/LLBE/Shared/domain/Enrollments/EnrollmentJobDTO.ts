import { EnrollmentDTO } from './EnrollmentDTO';
import { JobOpenCompanyDTO } from '../JobOpenings/JobOpenCompanyDTO';

export type EnrollmentJobDTO = EnrollmentDTO & {
  jobDetail: JobOpenCompanyDTO;
};
