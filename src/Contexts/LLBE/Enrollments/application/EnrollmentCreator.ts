import { EnrollmentRepository } from '../domain/EnrollmentRepository';
import { CreateEnrollmentRequest } from './CreateEnrollmentRequest';
import { Enrollment } from '../domain/Enrollment';
import { EnrollmentDate } from '../domain/EnrollmentDate';
import { JobOpeningId } from '../../Shared/domain/JobOpenings/JobOpeningId';
import { EnrollmentId } from '../../Shared/domain/Enrollments/EnrollmentId';
import { StudentId } from '../../Shared/domain/Students/StudentId';

export class EnrollmentCreator {
  private repository: EnrollmentRepository;

  constructor(repository: EnrollmentRepository) {
    this.repository = repository;
  }

  async run(request: CreateEnrollmentRequest): Promise<void> {
    const enrollmentId = EnrollmentId.random();

    const enrollment = Enrollment.create(
      enrollmentId,
      new StudentId(request.student),
      new JobOpeningId(request.job_opening),
      EnrollmentDate.now()
    );

    await this.repository.save(enrollment);
  }
}
