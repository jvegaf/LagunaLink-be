import { EnrollmentRepository } from '../domain/EnrollmentRepository';
import { ApplicationService } from '../../../Shared/domain/ApplicationService';
import { StudentId } from '../../Shared/domain/Students/StudentId';
import { Enrollment } from '../domain/Enrollment';

export class EnrollmentsFetcher extends ApplicationService {
  private repository: EnrollmentRepository;

  constructor(repository: EnrollmentRepository) {
    super();
    this.repository = repository;
  }

  async run(studentId: string): Promise<Array<Enrollment>> {
    return await this.repository.searchByStudent(new StudentId(studentId));
  }
}
