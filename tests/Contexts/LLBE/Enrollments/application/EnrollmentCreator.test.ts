import { EnrollmentRepositoryMock } from '../__mocks__/EnrollmentRepositoryMock';
import { EnrollmentCreator } from '../../../../../src/Contexts/LLBE/Enrollments/application/EnrollmentCreator';
import { EnrollmentRequestMother } from './EnrollmentRequestMother';
import { EnrollmentMother } from '../domain/EnrollmentMother';

let repository: EnrollmentRepositoryMock;
let creator: EnrollmentCreator;

beforeEach(() => {
  repository = new EnrollmentRepositoryMock();
  creator = new EnrollmentCreator(repository);
});

it('should create a valid Enrollment', async () => {
  const request = EnrollmentRequestMother.random();
  const enrollment = EnrollmentMother.fromRequest(request);
  const createRequest = EnrollmentRequestMother.createRequestFromComplete(
    request
  );
  await creator.run(createRequest);

  repository.assertLastSavedEnrollmentIs(enrollment);
});
