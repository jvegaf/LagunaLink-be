import { JobOpeningRepository } from '../domain/JobOpeningRepository';
import { UpgradeJobOpeningRequest } from './UpgradeJobOpeningRequest';
import { JobOpening } from '../domain/JobOpening';
import { CompanyId } from '../../Shared/domain/Companies/CompanyId';
import { JobOpenTitle } from '../domain/JobOpenTitle';
import { JobOpenPosition } from '../domain/JobOpenPosition';
import { JobOpenConditions } from '../domain/JobOpenConditions';
import { JobOpenResponsibilities } from '../domain/JobOpenResponsibilities';
import { JobOpenQualification } from '../domain/JobOpenQualification';
import { JobOpenPrevExperience } from '../domain/JobOpenPrevExperience';
import { JobOpeningId } from '../../Shared/domain/JobOpenings/JobOpeningId';
import { JobOpeningNotFound } from '../domain/JobOpeningNotFound';

export class JobOpeningUpgrader {
  private repository: JobOpeningRepository;

  constructor(repository: JobOpeningRepository) {
    this.repository = repository;
  }

  async run(request: UpgradeJobOpeningRequest): Promise<void> {
    await this.ensureJobOpeningExists(new JobOpeningId(request.id));

    const jobOpening = JobOpening.create(
      new JobOpeningId(request.id),
      new CompanyId(request.company),
      new JobOpenTitle(request.title),
      new JobOpenPosition(request.position),
      new JobOpenConditions(request.conditions),
      new JobOpenResponsibilities(request.responsibilities),
      new JobOpenQualification(request.qualification),
      new JobOpenPrevExperience(request.prevExperience)
    );

    await this.repository.save(jobOpening);
  }

  private async ensureJobOpeningExists(jobOpeningId: JobOpeningId) {
    if ((await this.repository.search(jobOpeningId)) === null) {
      throw new JobOpeningNotFound('This job opening not exists');
    }
  }
}
