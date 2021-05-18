import { JobOpeningType } from './JobOpeningType';
import { Company } from '../../../Companies/domain/Company';

export type JobOpenCompanyType = JobOpeningType & {
  companyDetail: Company;
};
