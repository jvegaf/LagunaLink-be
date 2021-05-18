import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { CompanyRepository } from '../../domain/CompanyRepository';
import { CompanyId } from '../../../Shared/domain/Companies/CompanyId';
import { Company } from '../../domain/Company';
import { CompanyNotFound } from '../../domain/CompanyNotFound';
import { CompanyFinderRequest } from './CompanyFinderRequest';
import { CompanyDTO } from '../../../Shared/domain/Companies/CompanyDTO';
import { CompanyProfile } from '../../../Shared/domain/Companies/CompanyProfile';

export class CompanyFinder extends ApplicationService {
  private repository: CompanyRepository;

  constructor(repository: CompanyRepository) {
    super();
    this.repository = repository;
  }

  async run(request: CompanyFinderRequest): Promise<CompanyDTO> {
    const {companyId, accountOwner} = request;
    const id = new CompanyId(companyId);
    await this.checkExists(id);
    if (!accountOwner) {
      const _company = await this.repository.search(id) as Company;
      return _company.toPrimitives();
    }

    const _companyProfile = await this.repository.searchProfile(id) as CompanyProfile;
    return _companyProfile.toPrimitives();
  }

  private async checkExists(id: CompanyId) {
    const result = await this.repository.search(id);
    if (result === null) {
      throw new CompanyNotFound(`Not found a company with id ${id.value}`);
    }
  }
}
