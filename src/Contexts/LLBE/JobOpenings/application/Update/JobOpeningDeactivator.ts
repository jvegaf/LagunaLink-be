import { JobOpeningRepository } from '../../domain/JobOpeningRepository';
import { JobOpening } from '../../domain/JobOpening';
import { CompanyId } from '../../../Shared/domain/Companies/CompanyId';
import { JobOpeningId } from '../../../Shared/domain/JobOpenings/JobOpeningId';
import { JobOpeningNotFound } from '../../domain/JobOpeningNotFound';
import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError';

export class JobOpeningDeactivator extends ApplicationService {
  private repository: JobOpeningRepository;

  constructor(repository: JobOpeningRepository) {
    super();
    this.repository = repository;
  }

  async run(jobId: string, companyId: string): Promise<void> {
    const job = await this.repository.search(new JobOpeningId(jobId));
    if (job === null) {
      throw new JobOpeningNotFound('This job opening not exists');
    }
    await this.ensureJobOpeningisOwn(job, new CompanyId(companyId));

    await this.repository.save(job.deactivate());
  }

  private async ensureJobOpeningisOwn(job: JobOpening, companyId: CompanyId) {
    if (job.company.value !== companyId.value) {
      throw new InvalidArgumentError('the job is not own of this company');
    }
  }
}
