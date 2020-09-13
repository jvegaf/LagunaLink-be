import { StudentRepository } from '../domain/StudentRepository';
import { Student } from '../domain/Student';
import { CreateStudentRequest } from './CreateStudentRequest';
import { StudentId } from '../../Shared/domain/Students/StudentId';
import { StudentName } from '../domain/StudentName';
import { StudentSurname } from '../domain/StudentSurname';
import { StudentLastname } from '../domain/StudentLastname';

export class StudentCreator {
  private repository: StudentRepository;

  constructor(repository: StudentRepository) {
    this.repository = repository;
  }

  async run(request: CreateStudentRequest): Promise<void> {
    const student = Student.create(
      new StudentId(StudentId.random().toString()),
      new StudentName(request.name),
      new StudentSurname(request.surname),
      new StudentLastname(request.lastname)
    );

    await this.repository.save(student);
  }
}
