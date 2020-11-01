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
import {RemoveJobOpeningRequest} from './RemoveJobOpeningRequest';
import {InvalidArgumentError} from '../../../Shared/domain/value-object/InvalidArgumentError';

export class JobOpeningRemover {
  private repository: JobOpeningRepository;

  constructor(repository: JobOpeningRepository) {
    this.repository = repository;
  }

  async run(removeRequest: RemoveJobOpeningRequest): Promise<void> {
    const jobOpeningId = new JobOpeningId(removeRequest.id);

    await this.ensureJobOpeningExistsAndCompanyOwner(jobOpeningId, removeRequest.company);

    await this.repository.remove(jobOpeningId);
  }

  private async ensureJobOpeningExistsAndCompanyOwner(jobOpeningId: JobOpeningId, company: string) {
    const jobOpening = await this.repository.search(jobOpeningId);
    if (jobOpening === null) {
      throw new JobOpeningNotFound('This job opening not exists');
    }

    if (jobOpening.company.value !== company) {
      throw new InvalidArgumentError('This company is not owner of the Job Opening');
    }
  }
}
