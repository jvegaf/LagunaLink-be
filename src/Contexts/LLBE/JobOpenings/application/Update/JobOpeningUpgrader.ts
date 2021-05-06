import { JobOpeningRepository } from '../../domain/JobOpeningRepository';
import { UpgradeJobOpeningRequest } from './UpgradeJobOpeningRequest';
import { JobOpening } from '../../domain/JobOpening';
import { CompanyId } from '../../../Shared/domain/Companies/CompanyId';
import { JobOpenDescription } from '../../domain/JobOpenDescription';
import { JobOpenPosition } from '../../domain/JobOpenPosition';
import { JobOpenConditions } from '../../domain/JobOpenConditions';
import { JobOpenResponsibilities } from '../../domain/JobOpenResponsibilities';
import { JobOpenQualification } from '../../domain/JobOpenQualification';
import { JobOpenPrevExperience } from '../../domain/JobOpenPrevExperience';
import { JobOpeningId } from '../../../Shared/domain/JobOpenings/JobOpeningId';
import { JobOpeningNotFound } from '../../domain/JobOpeningNotFound';
import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { JobOpenCreatedAt } from '../../domain/JobOpenCreatedAt';
import { JobOpenHiringDate } from '../../domain/JobOpenHiringDate';

export class JobOpeningUpgrader extends ApplicationService {
  private repository: JobOpeningRepository;

  constructor(repository: JobOpeningRepository) {
    super();
    this.repository = repository;
  }

  async run(request: UpgradeJobOpeningRequest): Promise<void> {
    await this.ensureJobOpeningExists(new JobOpeningId(request.id));

    const jobOpening = JobOpening.create(
      new JobOpeningId(request.id),
      JobOpenCreatedAt.now(),
      new CompanyId(request.company),
      new JobOpenDescription(request.description),
      new JobOpenPosition(request.position),
      new JobOpenConditions(request.conditions),
      new JobOpenResponsibilities(request.responsibilities),
      new JobOpenQualification(request.qualification),
      new JobOpenPrevExperience(request.prevExperience),
      new JobOpenHiringDate(request.hiringDate)
    );

    await this.repository.save(jobOpening);
  }

  private async ensureJobOpeningExists(jobOpeningId: JobOpeningId) {
    if ((await this.repository.search(jobOpeningId)) === null) {
      throw new JobOpeningNotFound('This job opening not exists');
    }
  }
}
