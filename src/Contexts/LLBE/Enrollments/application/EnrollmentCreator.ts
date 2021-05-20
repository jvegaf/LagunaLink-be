import { EnrollmentRepository } from '../domain/EnrollmentRepository';
import { CreateEnrollmentRequest } from './CreateEnrollmentRequest';
import { Enrollment } from '../domain/Enrollment';
import { EnrollmentDate } from '../domain/EnrollmentDate';
import { JobOpeningId } from '../../Shared/domain/JobOpenings/JobOpeningId';
import { EnrollmentId } from '../../Shared/domain/Enrollments/EnrollmentId';
import { StudentId } from '../../Shared/domain/Students/StudentId';
import { ApplicationService } from '../../../Shared/domain/ApplicationService';

export class EnrollmentCreator extends ApplicationService {
  private repository: EnrollmentRepository;

  constructor(repository: EnrollmentRepository) {
    super();
    this.repository = repository;
  }

  async run(request: CreateEnrollmentRequest): Promise<void> {
    const enrollmentId = EnrollmentId.random();

    const enrollment = Enrollment.create({
      enrollmentDate: EnrollmentDate.now(),
      id: enrollmentId,
      jobOpening: new JobOpeningId(request.job_opening),
      student: new StudentId(request.student)
    });

    await this.repository.save(enrollment);
  }
}
