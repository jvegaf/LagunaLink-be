import { StudentRepositoryMock } from '../../__mocks__/StudentRepositoryMock';
import { StudentUpgrader } from '../../../../../../src/Contexts/LLBE/Students/application/Update/StudentUpgrader';
import { UpgradeStudentRequestMother } from './UpgradeStudentRequestMother';
import { Student } from '../../../../../../src/Contexts/LLBE/Students/domain/Student';
import { UserLastUpdateResumerMock } from '../../../Shared/__mocks__/UserLastUpdateResumerMock';
import { LastUpdateResumer } from '../../../../../../src/Contexts/LLBE/Users/application/LastUpdateResumer';
import { StudentMother } from '../../domain/StudentMother';
import { StudentDTO } from '../../../../../../src/Contexts/LLBE/Shared/domain/Students/StudentDTO';

let repository: StudentRepositoryMock;
let upgrader: StudentUpgrader;
let userUpdater: LastUpdateResumer ;

beforeEach(() => {
  repository = new StudentRepositoryMock();
  userUpdater = new UserLastUpdateResumerMock();
  upgrader = new StudentUpgrader(repository, userUpdater);
});

it('should can upgrade a valid student', async () => {
  const student = StudentMother.random();

  const request = UpgradeStudentRequestMother.random(student.id.value);
  const studentUpd = Student.fromPrimitives(request as StudentDTO);
  repository.whenSearchThenReturn(studentUpd);
  const studentUpdated = await upgrader.run(request);

  repository.assertLastSavedStudentIs(studentUpdated);
});
