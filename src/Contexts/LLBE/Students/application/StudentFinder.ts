import { StudentRepository } from '../domain/StudentRepository';
import { Student } from '../domain/Student';
import { StudentId } from '../../Shared/domain/Students/StudentId';
import { ApplicationService } from '../../../Shared/domain/ApplicationService';

export class StudentFinder extends ApplicationService{
  private repository: StudentRepository;

  constructor(repository: StudentRepository) {
    super();
    this.repository = repository;
  }

  async run(studentId: StudentId): Promise<Student> {
    return (await this.repository.search(studentId)) as Student;
  }
}
