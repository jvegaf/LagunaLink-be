import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { JobOpeningRepository } from '../../domain/JobOpeningRepository';
import { JobOpening } from '../../domain/JobOpening';

export class JobOpeningFetcher extends ApplicationService {
  private repository: JobOpeningRepository;

  constructor(repository: JobOpeningRepository) {
    super();
    this.repository = repository;
  }

  async run(): Promise<Array<JobOpening>> {
    const result = await this.repository.fetch();
    this.logInfo(`Fetched ${result.length} Job Openings`);
    return result;
  }
}
