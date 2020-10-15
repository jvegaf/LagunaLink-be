import { StudentCreator } from '../../../../../src/Contexts/LLBE/Students/application/StudentCreator';
import { StudentMother } from '../domain/StudentMother';
import { StudentRepositoryMock } from '../__mocks__/StudentRepositoryMock';
import { CreateStudentRequestMother } from './CreateStudentRequestMother';
import { StudentExists } from '../../../../../src/Contexts/LLBE/Students/domain/StudentExists';

let repository: StudentRepositoryMock;
let creator: StudentCreator;

beforeEach(() => {
  repository = new StudentRepositoryMock();
  creator = new StudentCreator(repository);
});

it('should create a valid student', async () => {
  const request = CreateStudentRequestMother.random();

  const student = StudentMother.fromCreateRequest(request);

  repository.whenSearchThenReturn(null);
  await creator.run(request);

  repository.assertLastSavedStudentIs(student);
});

it('should throw an error when try create a previously created student', async () => {
  const request = CreateStudentRequestMother.random();

  const student = StudentMother.fromCreateRequest(request);

  repository.whenSearchThenReturn(null);
  await creator.run(request);

  repository.whenSearchThenReturn(student);

  await expect(creator.run(request)).rejects.toThrow(StudentExists);
});
