import { EnrollmentRepository } from '../domain/EnrollmentRepository';
import { Enrollment } from '../domain/Enrollment';
import { JobOpeningId } from '../../Shared/domain/JobOpenings/JobOpeningId';
import { ApplicationService } from '../../../Shared/domain/ApplicationService';

export class EnrollmentsSearcher extends ApplicationService {
  private repository: EnrollmentRepository;

  constructor(repository: EnrollmentRepository) {
    super();
    this.repository = repository;
  }

  async run(jobOpeningId: string): Promise<Array<Enrollment>> {
    return this.repository.searchByJobOpening(new JobOpeningId(jobOpeningId));
  }
}
