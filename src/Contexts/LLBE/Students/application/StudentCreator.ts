import { StudentRepository } from '../domain/StudentRepository';
import { Student } from '../domain/Student';
import { CreateStudentRequest } from './CreateStudentRequest';
import { StudentId } from '../../Shared/domain/Students/StudentId';
import { StudentName } from '../domain/StudentName';
import { StudentSurname } from '../domain/StudentSurname';
import { StudentLastname } from '../domain/StudentLastname';
import { StudentExists } from '../domain/StudentExists';

export class StudentCreator {
  private repository: StudentRepository;

  constructor(repository: StudentRepository) {
    this.repository = repository;
  }

  async run(request: CreateStudentRequest): Promise<void> {
    await this.ensureStudentNotExists(new StudentId(request.id));

    const student = Student.create(
      new StudentId(request.id),
      new StudentName(request.name),
      new StudentSurname(request.surname),
      new StudentLastname(request.lastname)
    );

    await this.repository.save(student);
  }

  private async ensureStudentNotExists(studentId: StudentId) {
    if ((await this.repository.search(studentId)) !== null) {
      throw new StudentExists('the student account exists');
    }
  }
}
