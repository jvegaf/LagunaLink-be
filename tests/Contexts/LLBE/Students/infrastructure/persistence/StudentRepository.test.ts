import container from '../../../../../../src/app/lagunalink_be/config/dependency-injection';
import { StudentRepository } from '../../../../../../src/Contexts/LLBE/Students/domain/StudentRepository';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { StudentMother } from '../../domain/StudentMother';

const repository: StudentRepository = container.get('Mooc.courses.CourseRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('Mooc.EnvironmentArranger');

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).close();
});

describe('Save Course', () => {
  it('should save a course', async () => {
    const course = CourseMother.random();

    await repository.save(course);
  });
});

describe('Search Course', () => {
  it('should return an existing course', async () => {
    const course = CourseMother.random();

    await repository.save(course);

    expect(course).toEqual(await repository.search(course.id));
  });

  it('should not return a non existing course', async () => {
    expect(await repository.search(CourseMother.random().id)).toBeFalsy();
  });
});
