import { StudentRepositoryMock } from '../__mocks__/StudentRepositoryMock';
import { StudentUpgrader } from '../../../../../src/Contexts/LLBE/Students/application/StudentUpgrader';
import { UpgradeStudentRequestMother } from './UpgradeStudentRequestMother';
import { Student } from '../../../../../src/Contexts/LLBE/Students/domain/Student';

let repository: StudentRepositoryMock;
let upgrader: StudentUpgrader;

beforeEach(() => {
  repository = new StudentRepositoryMock();
  upgrader = new StudentUpgrader(repository);
});

it('should can upgrade a valid student', async () => {
  const request = UpgradeStudentRequestMother.random();

  const student = Student.fromPrimitives(request);

  repository.whenSearchThenReturn(student);
  await upgrader.run(request);

  repository.assertLastSavedStudentIs(student);
});
