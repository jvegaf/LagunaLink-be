import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { JobOpeningRepository } from '../../domain/JobOpeningRepository';
import { JobOpening } from '../../domain/JobOpening';

export class JobOpeningsFetcher extends ApplicationService {
  private repository: JobOpeningRepository;

  constructor(repository: JobOpeningRepository) {
    super();
    this.repository = repository;
  }

  async run(): Promise<Array<JobOpening>> {
    return await this.repository.fetch();
  }
}
