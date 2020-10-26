import { EnrollmentRepository } from '../domain/EnrollmentRepository';
import { EnrollmentId } from '../../Shared/domain/Enrollments/EnrollmentId';
import { EnrollmentNotFound } from '../domain/EnrollmentNotFound';
import { RemoveEnrollmentRequest } from './RemoveEnrollmentRequest';
import { EnrollmentOwner } from '../domain/EnrollmentOwner';

export class EnrollmentRemover {
  private repository: EnrollmentRepository;

  constructor(repository: EnrollmentRepository) {
    this.repository = repository;
  }

  async run(request: RemoveEnrollmentRequest): Promise<void> {
    await this.ensureEnrollmentStudentOwner(request);

    await this.repository.remove(new EnrollmentId(request.enrollment_id));
  }

  private async ensureEnrollmentStudentOwner(request: RemoveEnrollmentRequest) {
    const enrollment = await this.repository.search(
      new EnrollmentId(request.enrollment_id)
    );
    if (enrollment === null) {
      throw new EnrollmentNotFound('This enrollment not exists');
    }
    if (enrollment.student.value !== request.student) {
      throw new EnrollmentOwner('The owner is diferent');
    }
  }
}
