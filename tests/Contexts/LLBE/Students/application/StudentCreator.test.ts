import { StudentCreator } from '../../../../../src/Contexts/LLBE/Students/application/StudentCreator';
import { StudentMother } from '../domain/StudentMother';
import { StudentRepositoryMock } from '../__mocks__/StudentRepositoryMock';
import { CreateStudentRequestMother } from './CreateStudentRequestMother';
import { StudentExists } from '../../../../../src/Contexts/LLBE/Students/domain/StudentExists';
import { UserUpdateRegisteredMock } from '../../Shared/__mocks__/UserUpdateRegisteredMock';
import { UserUpdateRegistered } from '../../../../../src/Contexts/LLBE/Users/application/UserUpdateRegistered';
import { UserRepositoryMock } from '../../Users/__mocks__/UserRepositoryMock';

let repository: StudentRepositoryMock;

let userUpdRegMock: UserUpdateRegistered;
let creator: StudentCreator;

beforeEach(() => {
  userUpdRegMock = new UserUpdateRegisteredMock(new UserRepositoryMock());
  repository = new StudentRepositoryMock();
  creator = new StudentCreator(repository, userUpdRegMock);
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
