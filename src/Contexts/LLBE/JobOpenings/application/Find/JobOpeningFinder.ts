import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { JobOpeningRepository } from '../../domain/JobOpeningRepository';
import { JobOpeningId } from '../../../Shared/domain/JobOpenings/JobOpeningId';
import { JobOpening } from '../../domain/JobOpening';
import { JobOpeningNotFound } from '../../domain/JobOpeningNotFound';

export class JobOpeningFinder extends ApplicationService {
  private repository: JobOpeningRepository;

  constructor(repository: JobOpeningRepository) {
    super();
    this.repository = repository;
  }

  async run(jobOpeningId: JobOpeningId): Promise<JobOpening> {
    const result = await this.repository.search(jobOpeningId);
    if (result === null) {
      throw new JobOpeningNotFound('Not found that Job Opening');
    }
    return result;
  }
}
