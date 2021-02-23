import { StudentRepository } from '../../domain/StudentRepository';
import { Student } from '../../domain/Student';
import { UpgradeStudentRequest } from './UpgradeStudentRequest';
import { ApplicationService } from '../../../../Shared/domain/ApplicationService';

export class StudentUpgrader extends ApplicationService {
  private repository: StudentRepository;

  constructor(repository: StudentRepository) {
    super();
    this.repository = repository;
  }

  async run(request: UpgradeStudentRequest): Promise<void> {

    const student = Student.fromPrimitives(request);
    await this.repository.save(student);
    this.logInfo(`student ${request.id} updated`);
  }
}
