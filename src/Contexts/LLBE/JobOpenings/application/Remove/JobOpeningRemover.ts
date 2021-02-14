import { JobOpeningRepository } from '../../domain/JobOpeningRepository';
import { JobOpeningId } from '../../../Shared/domain/JobOpenings/JobOpeningId';
import { JobOpeningNotFound } from '../../domain/JobOpeningNotFound';
import { RemoveJobOpeningRequest } from './RemoveJobOpeningRequest';
import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError';
import { ApplicationService } from '../../../../Shared/domain/ApplicationService';

export class JobOpeningRemover extends ApplicationService {
  private repository: JobOpeningRepository;

  constructor(repository: JobOpeningRepository) {
    super();
    this.repository = repository;
  }

  async run(removeRequest: RemoveJobOpeningRequest): Promise<void> {
    const jobOpeningId = new JobOpeningId(removeRequest.id);

    await this.ensureJobOpeningExistsAndCompanyOwner(jobOpeningId, removeRequest.company);

    await this.repository.remove(jobOpeningId);
    this.logInfo(`JobOpening ${jobOpeningId.value} removed`);
  }

  private async ensureJobOpeningExistsAndCompanyOwner(jobOpeningId: JobOpeningId, company: string) {
    const jobOpening = await this.repository.search(jobOpeningId);
    if (jobOpening === null) {
      const message = 'This job opening not exists';
      this.logError(message);
      throw new JobOpeningNotFound(message);
    }

    if (jobOpening.company.value !== company) {
      const message = 'This company is not owner of the Job Opening';
      this.logError(message);
      throw new InvalidArgumentError(message);
    }
  }
}
