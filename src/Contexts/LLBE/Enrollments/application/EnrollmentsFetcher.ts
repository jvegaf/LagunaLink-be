import { EnrollmentRepository } from '../domain/EnrollmentRepository';
import { Enrollment } from '../domain/Enrollment';
import { ApplicationService } from '../../../Shared/domain/ApplicationService';
import { StudentId } from '../../Shared/domain/Students/StudentId';

export class EnrollmentsFetcher extends ApplicationService {
  private repository: EnrollmentRepository;

  constructor(repository: EnrollmentRepository) {
    super();
    this.repository = repository;
  }

  async run(studentId: string): Promise<Array<Enrollment>> {
    return this.repository.searchByStudent(new StudentId(studentId));
  }
}
