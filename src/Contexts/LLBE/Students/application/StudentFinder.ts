import { StudentRepository } from '../domain/StudentRepository';
import { Student } from '../domain/Student';
import { StudentId } from '../../Shared/domain/Students/StudentId';

export class StudentFinder {
  private repository: StudentRepository;

  constructor(repository: StudentRepository) {
    this.repository = repository;
  }

  async run(studentId: StudentId): Promise<Student> {
    return (await this.repository.search(studentId)) as Student;
  }
}
