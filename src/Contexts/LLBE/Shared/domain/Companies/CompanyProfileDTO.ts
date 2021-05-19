import { CompanyDTO } from './CompanyDTO';
import { JobOpenEnrollsDTO } from '../JobOpenings/JobOpenEnrollsDTO';

export type CompanyProfileDTO = CompanyDTO & {
  jobOpenings: JobOpenEnrollsDTO[];
};
