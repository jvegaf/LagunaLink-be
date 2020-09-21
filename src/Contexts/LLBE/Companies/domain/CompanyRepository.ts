import { Nullable } from '../../../Shared/domain/Nullable';
import { Company } from './Company';
import { CompanyId } from '../../Shared/domain/Companies/CompanyId';

export interface CompanyRepository {
  save(company:  Company): Promise<void>;

  search(id: CompanyId): Promise<Nullable<Company>>;
}
