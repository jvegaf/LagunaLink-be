import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { JobOpeningRepository } from '../../domain/JobOpeningRepository';
import { CompanyId } from '../../../Shared/domain/Companies/CompanyId';
import { JobOpening } from '../../domain/JobOpening';

export class CompanyJobsFetcher extends ApplicationService {
  private repository: JobOpeningRepository;

  constructor(repository: JobOpeningRepository) {
    super();
    this.repository = repository;
  }

  async run(companyId: CompanyId): Promise<Array<JobOpening>> {
    const result = await this.repository.fetchFromCompany(companyId.value);
    this.logInfo(`Fetched ${result.length} Job Openings of Company ${companyId.value}`);
    return result;
  }
}
