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
import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError';
import { JobOpenIsActive } from '../../domain/JobOpenIsActive';

export class JobOpeningUpgrader extends ApplicationService {
  private repository: JobOpeningRepository;

  constructor(repository: JobOpeningRepository) {
    super();
    this.repository = repository;
  }

  async run(request: UpgradeJobOpeningRequest): Promise<void> {
    await this.ensureJobOpeningExists(new JobOpeningId(request.id));
    await this.ensureJobOpeningisOwn(new JobOpeningId(request.id), new CompanyId(request.company));

    const jobOpening = JobOpening.create({
      id: new JobOpeningId(request.id),
      createdAt: JobOpenCreatedAt.now(),
      company: new CompanyId(request.company),
      description: new JobOpenDescription(request.description),
      position: new JobOpenPosition(request.position),
      conditions: new JobOpenConditions(request.conditions),
      responsibilities: new JobOpenResponsibilities(request.responsibilities),
      qualification: new JobOpenQualification(request.qualification),
      prevExperience: new JobOpenPrevExperience(request.prevExperience),
      hiringDate: new JobOpenHiringDate(request.hiringDate),
      isActive: new JobOpenIsActive(request.isActive),
    });

    await this.repository.save(jobOpening);
  }

  private async ensureJobOpeningExists(jobOpeningId: JobOpeningId) {
    if ((await this.repository.search(jobOpeningId)) === null) {
      throw new JobOpeningNotFound('This job opening not exists');
    }
  }

  private async ensureJobOpeningisOwn(jobOpeningId: JobOpeningId, companyId: CompanyId) {
    const job = (await this.repository.search(jobOpeningId)) as JobOpening;
    if (job.company.value !== companyId.value) {
      throw new InvalidArgumentError('the job is not own of this company');
    }
  }
}
