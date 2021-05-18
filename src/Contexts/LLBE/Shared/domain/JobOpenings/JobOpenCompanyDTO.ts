import { JobOpeningDTO } from './JobOpeningDTO';
import { CompanyDTO } from '../Companies/CompanyDTO';

export type JobOpenCompanyDTO = JobOpeningDTO & {
  companyDetail: CompanyDTO;
};
