import { JobOpeningRepositoryMock } from '../../__mocks__/JobOpeningRepositoryMock';
import { CreateJobOpeningRequestMother } from '../Create/CreateJobOpeningRequestMother';
import { JobOpening } from '../../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpening';
import { JobOpeningMother } from '../../domain/JobOpeningMother';
import { CompanyIdMother } from '../../../Shared/domain/Companies/CompanyIdMother';
import { CompanyJobsFetcher } from '../../../../../../src/Contexts/LLBE/JobOpenings/application/Fetch/CompanyJobsFetcher';

let repository: JobOpeningRepositoryMock;
let fetcher: CompanyJobsFetcher;

beforeEach(() => {
  repository = new JobOpeningRepositoryMock();
  fetcher = new CompanyJobsFetcher(repository);
});

it('should fetch all jobOpenings of determinate Company', async () => {
  const jobOpenSet: JobOpening[] = [];
  const companyId = CompanyIdMother.random();
  for (let i = 0; i < 5; i++) {
    const request = CreateJobOpeningRequestMother.randomOfCompany(companyId.value);
    const jobOpening = JobOpeningMother.fromCreateRequest(request);
    jobOpenSet.push(jobOpening);
  }

  repository.whenFetchFromCompanyThenReturn(jobOpenSet);

  await expect(fetcher.run(companyId)).resolves.toEqual(jobOpenSet);
});
