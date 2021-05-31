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
import { JobOpenHiringDate } from '../../domain/JobOpenHiringDate';
import { JobOpenIsActive } from '../../domain/JobOpenIsActive';

export class JobOpeningCreator extends ApplicationService {
  private repository: JobOpeningRepository;

  constructor(repository: JobOpeningRepository) {
    super();
    this.repository = repository;
  }

  async run(request: CreateJobOpeningRequest): Promise<JobOpening> {
    const jobOpenId = JobOpeningId.random();

    const jobOpening = JobOpening.create({
      id: jobOpenId,
      createdAt: JobOpenCreatedAt.now(),
      company: new CompanyId(request.company),
      description: new JobOpenDescription(request.description),
      position: new JobOpenPosition(request.position),
      conditions: new JobOpenConditions(request.conditions),
      responsibilities: new JobOpenResponsibilities(request.responsibilities),
      qualification: new JobOpenQualification(request.qualification),
      prevExperience: new JobOpenPrevExperience(request.prevExperience),
      hiringDate: new JobOpenHiringDate(request.hiringDate),
      isActive: new JobOpenIsActive(true),
    });

    await this.repository.save(jobOpening);
    this.logInfo(`JobOpening ${jobOpenId.value!} created`);
    return jobOpening;
  }
}
