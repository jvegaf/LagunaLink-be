import { JobOpeningRepositoryMock } from '../../__mocks__/JobOpeningRepositoryMock';
import { JobOpeningIdMother } from '../../../Shared/domain/JobOpenings/JobOpeningIdMother';
import { CreateJobOpeningRequestMother } from '../Create/CreateJobOpeningRequestMother';
import { JobOpeningFinder } from '../../../../../../src/Contexts/LLBE/JobOpenings/application/Find/JobOpeningFinder';
import { JobOpeningMother } from '../../domain/JobOpeningMother';
import { JobOpeningNotFound } from '../../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpeningNotFound';

let repository: JobOpeningRepositoryMock;
let finder: JobOpeningFinder;

beforeEach(() => {
  repository = new JobOpeningRepositoryMock();
  finder = new JobOpeningFinder(repository);
});

it('should throw a JobOpeningNotFound exception if jobOpening not exists', async () => {
  const jobOpeningIdFake = JobOpeningIdMother.random();

  repository.whenSearchThenReturn(null);

  await expect(finder.run(jobOpeningIdFake)).rejects.toThrow(JobOpeningNotFound);
});

it('should found a valid jobOpening', async () => {
  const request = CreateJobOpeningRequestMother.random();
  const jobOpening = JobOpeningMother.fromCreateRequest(request);

  repository.whenSearchThenReturn(jobOpening);

  await expect(finder.run(jobOpening.id)).resolves.toEqual(jobOpening);
});
