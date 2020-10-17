import { CompanyRepositoryMock } from '../__mocks__/CompanyRepositoryMock';
import { CompanyCreator } from '../../../../../src/Contexts/LLBE/Companies/application/CompanyCreator';
import { CreateCompanyRequestMother } from './CreateCompanyRequestMother';
import { CompanyMother } from '../domain/CompanyMother';

let repository: CompanyRepositoryMock;
let creator: CompanyCreator;

beforeEach(() => {
  repository = new CompanyRepositoryMock();
  creator = new CompanyCreator(repository);
});

it('should create a valid company', async () => {
  const request = CreateCompanyRequestMother.random();

  const company = CompanyMother.fromRequest(request);
  repository.whenSearchThenReturn(null);
  await creator.run(request);

  repository.assertLastSavedCompanyIs(company);
});
