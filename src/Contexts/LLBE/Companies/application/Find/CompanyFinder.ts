import {ApplicationService} from '../../../../Shared/domain/ApplicationService';
import {CompanyRepository} from '../../domain/CompanyRepository';
import {CompanyId} from '../../../Shared/domain/Companies/CompanyId';
import {Company} from '../../domain/Company';
import {CompanyNotFound} from '../../domain/CompanyNotFound';
import {CompanyDTO} from '../../../Shared/domain/Companies/CompanyDTO';

export class CompanyFinder extends ApplicationService {
  private repository: CompanyRepository;

  constructor(repository: CompanyRepository) {
    super();
    this.repository = repository;
  }

  async run(companyId: string): Promise<CompanyDTO> {
    const id = new CompanyId(companyId);
    await this.checkExists(id);

    const company = await this.repository.search(id) as Company;
    return company.toPrimitives();

  }

  private async checkExists(id: CompanyId) {
    const result = await this.repository.search(id);
    if (result === null) {
      throw new CompanyNotFound(`Not found a company with id ${id.value}`);
    }
  }
}
