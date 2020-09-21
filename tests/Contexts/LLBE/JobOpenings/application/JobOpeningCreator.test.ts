import { JobOpeningMother } from '../domain/JobOpeningMother';
import { JobOpeningRepositoryMock } from '../__mocks__/JobOpeningRepositoryMock';
import { CreateJobOpeningRequestMother } from './CreateJobOpeningRequestMother';
import {JobOpeningCreator} from "../../../../../src/Contexts/LLBE/JobOpenings/application/JobOpeningCreator";

let repository: JobOpeningRepositoryMock;
let creator: JobOpeningCreator;


beforeEach(() => {
  repository = new JobOpeningRepositoryMock();
  creator = new JobOpeningCreator(repository);
});

it('should create a valid jobOpening', async () => {
  const request = CreateJobOpeningRequestMother.random();

  const jobOpening = JobOpeningMother.fromRequest(request);

  await creator.run(request);

  repository.assertLastSavedJobOpeningIs(jobOpening);
});
