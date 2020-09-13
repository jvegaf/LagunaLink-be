import { StudentCreator } from '../../../../../src/Contexts/LLBE/Students/application/StudentCreator';
import { StudentMother } from '../domain/StudentMother';
import { StudentRepositoryMock } from '../__mocks__/StudentRepositoryMock';
import { CreateStudentRequestMother } from './CreateStudentRequestMother';

let repository: StudentRepositoryMock;
let creator: StudentCreator;


beforeEach(() => {
  repository = new StudentRepositoryMock();
  creator = new StudentCreator(repository);
});

it('should create a valid student', async () => {
  const request = CreateStudentRequestMother.random();

  const student = StudentMother.fromRequest(request);

  await creator.run(request);

  repository.assertLastSavedStudentIs(student);
});
