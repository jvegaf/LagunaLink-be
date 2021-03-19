import { StudentRepository } from '../../domain/StudentRepository';
import { Student } from '../../domain/Student';
import { UpgradeStudentRequest } from './UpgradeStudentRequest';
import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { UserId } from '../../../Shared/domain/Users/UserId';
import { LastUpdateResumer } from '../../../Users/application/LastUpdateResumer';
import { StudentId } from '../../../Shared/domain/Students/StudentId';

export class StudentUpgrader extends ApplicationService {
  private repository: StudentRepository;
  private userUpdater: LastUpdateResumer;

  constructor(repository: StudentRepository, userUpdater: LastUpdateResumer) {
    super();
    this.repository = repository;
    this.userUpdater = userUpdater;
  }

  async run(request: UpgradeStudentRequest): Promise<Student> {

    const student = Student.fromPrimitives(request);
    await this.repository.save(student);
    await this.userUpdater.run(new UserId(request.id));
    this.logInfo(`student ${request.id} updated`);

    return await this.repository.search(new StudentId(request.id)) as Student;
  }
}
