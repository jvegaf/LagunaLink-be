import { JobOpeningRepositoryMock } from '../../__mocks__/JobOpeningRepositoryMock';
import { JobOpeningsFetcher } from '../../../../../../src/Contexts/LLBE/JobOpenings/application/Fetch/JobOpeningsFetcher';
import { CreateJobOpeningRequestMother } from '../Create/CreateJobOpeningRequestMother';
import { JobOpening } from '../../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpening';
import { JobOpeningMother } from '../../domain/JobOpeningMother';

let repository: JobOpeningRepositoryMock;
let fetcher: JobOpeningsFetcher;

beforeEach(() => {
  repository = new JobOpeningRepositoryMock();
  fetcher = new JobOpeningsFetcher(repository);
});

it('should fetch all jobOpenings', async () => {
  const jobOpenSet: JobOpening[] = [];
  for (let i = 0; i < 5; i++) {
    const request = CreateJobOpeningRequestMother.random();
    const jobOpening = JobOpeningMother.fromCreateRequest(request);
    jobOpenSet.push(jobOpening);
  }

  repository.whenFetchThenReturn(jobOpenSet);

  await expect(fetcher.run()).resolves.toEqual(jobOpenSet);
});
