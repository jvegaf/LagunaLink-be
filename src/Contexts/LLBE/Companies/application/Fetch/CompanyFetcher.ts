import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { CompanyRepository } from '../../domain/CompanyRepository';
import { Company } from '../../domain/Company';

export class CompanyFetcher extends ApplicationService {
  private repository: CompanyRepository;

  constructor(repository: CompanyRepository) {
    super();
    this.repository = repository;
  }

  async run(): Promise<Array<Company>> {
    const result = await this.repository.fetch();
    this.logInfo(`Fetched ${result.length} Companies`);
    return result;
  }
}
