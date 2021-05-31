import { Nullable } from '../../../Shared/domain/Nullable';
import { Company } from './Company';
import { CompanyId } from '../../Shared/domain/Companies/CompanyId';
import { CompanyProfileDTO } from '../../Shared/domain/Companies/CompanyProfileDTO';

export interface CompanyRepository {
  save(company: Company): Promise<void>;

  search(id: CompanyId): Promise<Nullable<Company>>;

  searchProfile(id: CompanyId): Promise<CompanyProfileDTO>;

  fetch(): Promise<Array<Company>>;
}
