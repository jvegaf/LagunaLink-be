import { EnrollmentRepository } from '../domain/EnrollmentRepository';
import { EnrollmentId } from '../../Shared/domain/Enrollments/EnrollmentId';
import { EnrollmentNotFound } from '../domain/EnrollmentNotFound';

export class EnrollmentRemover {
  private repository: EnrollmentRepository;

  constructor(repository: EnrollmentRepository) {
    this.repository = repository;
  }

  async run(enrollId: EnrollmentId): Promise<void> {
    await this.ensureEnrollmentExists(enrollId);

    await this.repository.remove(enrollId);
  }

  private async ensureEnrollmentExists(enrollId: EnrollmentId) {
    if ((await this.repository.search(enrollId)) === null) {
      throw new EnrollmentNotFound('This enrollment not exists');
    }
  }
}
