import { CompanyType } from './CompanyType';
import { JobOpenEnrolls } from '../JobOpenings/JobOpenEnrolls';

export type CompanyProfileType = CompanyType & {
  jobOpenings: JobOpenEnrolls[];
};
