import { JobOpeningRepository } from '../../domain/JobOpeningRepository';
import { CreateJobOpeningRequest } from './CreateJobOpeningRequest';
import { JobOpening } from '../../domain/JobOpening';
import { CompanyId } from '../../../Shared/domain/Companies/CompanyId';
import { JobOpenResponsibilities } from '../../domain/JobOpenResponsibilities';
import { JobOpenPrevExperience } from '../../domain/JobOpenPrevExperience';
import { JobOpenQualification } from '../../domain/JobOpenQualification';
import { JobOpenPosition } from '../../domain/JobOpenPosition';
import { JobOpenConditions } from '../../domain/JobOpenConditions';
import { JobOpenDescription } from '../../domain/JobOpenDescription';
import { JobOpeningId } from '../../../Shared/domain/JobOpenings/JobOpeningId';
import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { JobOpenCreatedAt } from '../../domain/JobOpenCreatedAt';

export class JobOpeningCreator extends ApplicationService {
  private repository: JobOpeningRepository;

  constructor(repository: JobOpeningRepository) {
    super();
    this.repository = repository;
  }

  async run(request: CreateJobOpeningRequest): Promise<JobOpening> {
    const jobOpenId = JobOpeningId.random();

    const jobOpening = JobOpening.create(
      jobOpenId,
      JobOpenCreatedAt.now(),
      new CompanyId(request.company),
      new JobOpenDescription(request.description),
      new JobOpenPosition(request.position),
      new JobOpenConditions(request.conditions),
      new JobOpenResponsibilities(request.responsibilities),
      new JobOpenQualification(request.qualification),
      new JobOpenPrevExperience(request.prevExperience)
    );

    await this.repository.save(jobOpening);
    this.logInfo(`JobOpening ${jobOpenId.value !} created`);
    return jobOpening;
  }
}
