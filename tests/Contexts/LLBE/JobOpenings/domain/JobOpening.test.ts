import { CreateJobOpeningRequestMother } from '../application/Create/CreateJobOpeningRequestMother';
import { JobOpeningMother } from './JobOpeningMother';

describe('JobOpening', () => {
  it('should return a new jobOpening instance', () => {
    const request = CreateJobOpeningRequestMother.random();

    const jobOpening = JobOpeningMother.fromCreateRequest(request);

    expect(jobOpening.company.value).toBe(request.company);
    expect(jobOpening.description.value).toBe(request.description);
    expect(jobOpening.position.value).toBe(request.position);
  });
});
