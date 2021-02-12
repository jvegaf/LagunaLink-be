import { StudentRepositoryMock } from '../../__mocks__/StudentRepositoryMock';
import { StudentFinder } from '../../../../../../src/Contexts/LLBE/Students/application/Find/StudentFinder';
import { CreateStudentRequestMother } from '../Create/CreateStudentRequestMother';
import { StudentMother } from '../../domain/StudentMother';
import { StudentIdMother } from '../../../Shared/domain/Students/StudentIdMother';
import { StudentNotFound } from '../../../../../../src/Contexts/LLBE/Students/domain/StudentNotFound';

let repository: StudentRepositoryMock;
let finder: StudentFinder;

beforeEach(() => {
  repository = new StudentRepositoryMock();
  finder = new StudentFinder(repository);
});

it('should throw a StudentNotFound exception if student not exists', async () => {
  const studentIdFake = StudentIdMother.random();

  repository.whenSearchThenReturn(null);

  await expect(finder.run(studentIdFake)).rejects.toThrow(StudentNotFound);
});

it('should found a valid student', async () => {
  const request = CreateStudentRequestMother.random();
  const student = StudentMother.fromCreateRequest(request);

  repository.whenSearchThenReturn(student);

  await expect(finder.run(student.id)).resolves.toEqual(student);
});
