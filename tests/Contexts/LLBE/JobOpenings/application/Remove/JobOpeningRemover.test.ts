import { JobOpeningMother } from '../../domain/JobOpeningMother';
import { JobOpeningRepositoryMock } from '../../__mocks__/JobOpeningRepositoryMock';
import { JobOpeningNotFound } from '../../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpeningNotFound';
import { RemoveJobOpeningRequest } from '../../../../../../src/Contexts/LLBE/JobOpenings/application/Remove/RemoveJobOpeningRequest';
import { JobOpeningRemover } from '../../../../../../src/Contexts/LLBE/JobOpenings/application/Remove/JobOpeningRemover';
import { RemoveJobOpeningRequestMother } from './RemoveJobOpeningRequestMother';
import { InvalidArgumentError } from '../../../../../../src/Contexts/Shared/domain/value-object/InvalidArgumentError';

let repository: JobOpeningRepositoryMock;
let remover: JobOpeningRemover;

beforeEach(() => {
  repository = new JobOpeningRepositoryMock();
  remover = new JobOpeningRemover(repository);
});

it('should remove jobOpening', async () => {
  const jobOpening = JobOpeningMother.random();
  const removeRequest: RemoveJobOpeningRequest = {
    id: jobOpening.id.value,
    company: jobOpening.company.value
  };

  repository.whenSearchThenReturn(jobOpening);
  await remover.run(removeRequest);
});

it('should throw a JobOpeningNotFound when try remove a non exist Job Opening', async () => {
  const request = RemoveJobOpeningRequestMother.random();
  repository.whenSearchThenReturn(null);

  await expect(remover.run(request)).rejects.toThrow(JobOpeningNotFound);
});

it('should throw a InvalidArgumentError when try remove a non owner Job Opening', async () => {
  const jobOpening = JobOpeningMother.random();
  const request: RemoveJobOpeningRequest = {
    id: jobOpening.id.value,
    company: '1f0fb082-dc6c-4f26-9598-16a385fe1154'
  };

  repository.whenSearchThenReturn(jobOpening);
  await expect(remover.run(request)).rejects.toThrow(InvalidArgumentError);
});
