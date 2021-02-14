import { StudentRepository } from '../../domain/StudentRepository';
import { Student } from '../../domain/Student';
import { StudentId } from '../../../Shared/domain/Students/StudentId';
import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { StudentNotFound } from '../../domain/StudentNotFound';

export class StudentFinder extends ApplicationService {
  private repository: StudentRepository;

  constructor(repository: StudentRepository) {
    super();
    this.repository = repository;
  }

  async run(studentId: StudentId): Promise<Student> {
    const result = await this.repository.search(studentId);
    if (result === null) {
      throw new StudentNotFound(`Not found a student with id ${studentId.value}`);
    }
    return result;
  }
}
