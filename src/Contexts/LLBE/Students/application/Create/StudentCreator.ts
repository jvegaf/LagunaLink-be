import { StudentRepository } from '../../domain/StudentRepository';
import { Student } from '../../domain/Student';
import { StudentId } from '../../../Shared/domain/Students/StudentId';
import { StudentName } from '../../domain/StudentName';
import { StudentSurname } from '../../domain/StudentSurname';
import { StudentLastname } from '../../domain/StudentLastname';
import { StudentExists } from '../../domain/StudentExists';
import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { Qualification } from '../../domain/Qualification';

export class StudentCreator extends ApplicationService {
  private repository: StudentRepository;

  constructor(repository: StudentRepository) {
    super();
    this.repository = repository;
  }

  async run(userId: string): Promise<void> {
    await this.ensureStudentNotExists(new StudentId(userId));

    const student = Student.create({
      id: new StudentId(userId),
      name: new StudentName(),
      surname: new StudentSurname(),
      lastname: new StudentLastname(),
      qualification: Qualification.emptyQualification(),
      jobexperiences: [],
      languages: []
    });

    await this.repository.save(student);
  }

  private async ensureStudentNotExists(studentId: StudentId) {
    if ((await this.repository.search(studentId)) !== null) {
      throw new StudentExists('the student account exists');
    }
  }
}
