import { EnrollmentRepository } from '../domain/EnrollmentRepository';
import { ApplicationService } from '../../../Shared/domain/ApplicationService';
import { StudentId } from '../../Shared/domain/Students/StudentId';

export class EnrollmentsFetcher extends ApplicationService {
  private repository: EnrollmentRepository;

  constructor(repository: EnrollmentRepository) {
    super();
    this.repository = repository;
  }

  async run(studentId: string): Promise<Array<any>> {
    const enrollments = await this.repository.searchByStudent(new StudentId(studentId));
    return enrollments.map(enrollment => enrollment.toPrimitives());
  }
}
