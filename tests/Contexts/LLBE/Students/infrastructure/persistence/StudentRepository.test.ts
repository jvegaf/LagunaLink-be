import container from '../../../../../../src/app/lagunalink_be/config/dependency-injection';
import { StudentRepository } from '../../../../../../src/Contexts/LLBE/Students/domain/StudentRepository';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { StudentMother } from '../../domain/StudentMother';

const repository: StudentRepository = container.get('App.students.StudentRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('App.EnvironmentArranger');

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).close();
});

describe('Save student', () => {
  it('should save a student', async () => {
    const student = StudentMother.random();

    await repository.save(student);
  });
});

describe('Search Student', () => {
  it('should return an existing student', async () => {
    const student = StudentMother.random();

    await repository.save(student);

    expect(student).toEqual(await repository.search(student.id));
  });

  it('should not return a non existing student', async () => {
    expect(await repository.search(StudentMother.random().id)).toBeFalsy();
  });
});