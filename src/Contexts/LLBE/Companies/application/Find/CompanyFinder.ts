import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { CompanyRepository } from '../../domain/CompanyRepository';
import { CompanyId } from '../../../Shared/domain/Companies/CompanyId';
import { Company } from '../../domain/Company';
import { CompanyNotFound } from '../../domain/CompanyNotFound';

export class CompanyFinder extends ApplicationService {
  private repository: CompanyRepository;

  constructor(repository: CompanyRepository) {
    super();
    this.repository = repository;
  }

  async run(companyId: CompanyId): Promise<Company> {
    const result = await this.repository.search(companyId);
    if (result === null) { throw new CompanyNotFound(`Not found a company with id ${companyId.value}`); }
    return result;
  }
}
