import { EnrollmentRepository } from '../domain/EnrollmentRepository';
import { Enrollment } from '../domain/Enrollment';
import { JobOpeningId } from '../../Shared/domain/JobOpenings/JobOpeningId';

export class EnrollmentsSearcher {
  private repository: EnrollmentRepository;

  constructor(repository: EnrollmentRepository) {
    this.repository = repository;
  }

  async run(jobOpeningId: string): Promise<Array<Enrollment>> {
    return this.repository.searchByJobOpening(new JobOpeningId(jobOpeningId));
  }
}
