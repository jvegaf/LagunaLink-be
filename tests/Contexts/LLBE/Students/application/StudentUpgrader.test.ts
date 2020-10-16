import { StudentUpgrader } from '../../../../../src/Contexts/LLBE/Students/application/StudentUpgrader';
import { UpgradeStudentRequestMother } from './UpgradeStudentRequestMother';
import { Student } from '../../../../../src/Contexts/LLBE/Students/domain/Student';
import container from '../../../../../src/app/lagunalink_be/config/dependency-injection';
import { StudentRepository } from '../../../../../src/Contexts/LLBE/Students/domain/StudentRepository';
import { StudentId } from '../../../../../src/Contexts/LLBE/Shared/domain/Students/StudentId';

let repository: StudentRepository;
let upgrader: StudentUpgrader;

beforeAll(() => {
  repository = container.get('App.students.StudentRepository');
});

beforeEach(() => {
  upgrader = new StudentUpgrader(repository);
});

it('should can upgrade a valid student', async () => {
  const request = UpgradeStudentRequestMother.random();

  const student = Student.fromPrimitives(request);

  await upgrader.run(new StudentId(payload.userId), request);
  expect(student).toEqual(await repository.search(student.id));
});
