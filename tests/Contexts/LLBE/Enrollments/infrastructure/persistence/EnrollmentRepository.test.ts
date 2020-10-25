import container from '../../../../../../src/app/lagunalink_be/config/dependency-injection';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { EnrollmentRepository } from '../../../../../../src/Contexts/LLBE/Enrollments/domain/EnrollmentRepository';
import { EnrollmentMother } from '../../domain/EnrollmentMother';
import { JobOpeningIdMother } from '../../../Shared/domain/JobOpenings/JobOpeningIdMother';
import { Enrollment } from '../../../../../../src/Contexts/LLBE/Enrollments/domain/Enrollment';

const repository: EnrollmentRepository = container.get(
  'App.enrollments.EnrollmentRepository'
);
const environmentArranger: Promise<EnvironmentArranger> = container.get(
  'App.EnvironmentArranger'
);

beforeEach(async () => {
  // await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).close();
});

describe('Save enrollment', () => {
  it('should save a enrollment', async () => {
    const enrollment = EnrollmentMother.random();

    await repository.save(enrollment);
  });
});

describe('Search Enrollment', () => {
  it('should not return a non existing enrollment', async () => {
    expect(await repository.search(EnrollmentMother.random().id)).toBeFalsy();
  });

  it('should return an existing enrollment', async () => {
    const enrollment = EnrollmentMother.random();

    await repository.save(enrollment);

    expect(await repository.search(enrollment.id)).toEqual(enrollment);
  });

  it('should return an enrollments collection of a determinate Job Opening', async () => {
    const enrollments = EnrollmentMother.randomOfJobOpening();

    const jobOpening = enrollments[0].jobOpening;
    enrollments.map(async (enrollment) => {
      await repository.save(enrollment);
    });

    expect(await repository.searchByJobOpening(jobOpening)).toEqual(
      expect.arrayContaining(enrollments)
    );
  });

  it('should return a empty enrollments collection of a determinate Job Opening', async () => {
    const jobOpening = JobOpeningIdMother.random();

    expect(await repository.searchByJobOpening(jobOpening)).toStrictEqual([]);
  });
});

describe('Remove Enrollment', () => {
  it('should remove an existing enrollment', async () => {
    const enrollment = EnrollmentMother.random();

    await repository.save(enrollment);
    expect(enrollment).toEqual(await repository.search(enrollment.id));

    await repository.remove(enrollment.id);
    expect(await repository.search(enrollment.id)).toBeFalsy();
  });
});
