import { StudentRepository } from '../domain/StudentRepository';
import { Student } from '../domain/Student';
import { CreateStudentRequest } from './CreateStudentRequest';
import { StudentId } from '../../Shared/domain/Students/StudentId';
import { StudentName } from '../domain/StudentName';
import { StudentSurname } from '../domain/StudentSurname';
import { StudentLastname } from '../domain/StudentLastname';
import { StudentExists } from '../domain/StudentExists';
import { UserUpdateRegistered } from '../../Users/application/UserUpdateRegistered';
import { UserId } from '../../Shared/domain/Users/UserId';

export class StudentCreator {
  private repository: StudentRepository;
  private userUpdateReg: UserUpdateRegistered;

  constructor(repository: StudentRepository, userUpdateReg: UserUpdateRegistered) {
    this.repository = repository;
    this.userUpdateReg = userUpdateReg;
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
    await this.userUpdateReg.run(new UserId(student.id.value));
  }

  private async ensureStudentNotExists(studentId: StudentId) {
    if ((await this.repository.search(studentId)) !== null) {
      throw new StudentExists('the student account exists');
    }
  }
}
