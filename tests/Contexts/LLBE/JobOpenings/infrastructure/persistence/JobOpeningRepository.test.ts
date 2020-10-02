import container from '../../../../../../src/app/lagunalink_be/config/dependency-injection';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { JobOpeningMother } from '../../domain/JobOpeningMother';
import { JobOpeningRepository } from '../../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpeningRepository';

const repository: JobOpeningRepository = container.get(
  'App.jobOpenings.JobOpeningRepository'
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

describe('Save jobOpening', () => {
  it('should save a jobOpening', async () => {
    const jobOpening = JobOpeningMother.random();

    await repository.save(jobOpening);
  });
});

describe('Search JobOpening', () => {
  it('should return an existing jobOpening', async () => {
    const jobOpening = JobOpeningMother.random();

    await repository.save(jobOpening);

    expect(jobOpening).toEqual(await repository.search(jobOpening.id));
  });

  it('should not return a non existing jobOpening', async () => {
    expect(await repository.search(JobOpeningMother.random().id)).toBeFalsy();
  });
});
