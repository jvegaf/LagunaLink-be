import { EnrollmentRepository } from '../domain/EnrollmentRepository';
import { ApplicationService } from '../../../Shared/domain/ApplicationService';
import { JobOpeningId } from '../../Shared/domain/JobOpenings/JobOpeningId';

export class EnrollmentsCounter extends ApplicationService {
  private repository: EnrollmentRepository;

  constructor(repository: EnrollmentRepository) {
    super();
    this.repository = repository;
  }

  async run(jobOpenId: string): Promise<Number> {
    return await this.repository.quantityOfJobOpening(new JobOpeningId(jobOpenId));
  }
}
