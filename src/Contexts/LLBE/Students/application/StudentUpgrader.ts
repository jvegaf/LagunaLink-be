import { StudentRepository } from '../domain/StudentRepository';
import { Student } from '../domain/Student';
import { UpgradeStudentRequest } from './UpgradeStudentRequest';

export class StudentUpgrader {
  private repository: StudentRepository;

  constructor(repository: StudentRepository) {
    this.repository = repository;
  }

  async run(request: UpgradeStudentRequest): Promise<void> {

    const student = Student.fromPrimitives(request);
    await this.repository.save(student);
  }
}
