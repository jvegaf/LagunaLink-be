import { EnrollmentType } from './EnrollmentType';
import { JobOpenCompany } from '../JobOpenings/JobOpenCompany';

export type EnrollmentJobType = EnrollmentType & {
  jobOpeningDetail: JobOpenCompany;
};
