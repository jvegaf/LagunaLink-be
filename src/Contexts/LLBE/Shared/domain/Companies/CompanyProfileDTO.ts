import { CompanyDTO } from './CompanyDTO';
import { JobOpeningDTO } from '../JobOpenings/JobOpeningDTO';

export type CompanyProfileDTO = CompanyDTO & {
  jobOpenings: JobOpeningDTO[];
};
