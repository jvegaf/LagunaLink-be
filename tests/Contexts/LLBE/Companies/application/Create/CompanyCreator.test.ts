import { CompanyRepositoryMock } from '../../__mocks__/CompanyRepositoryMock';
import { CompanyCreator } from '../../../../../../src/Contexts/LLBE/Companies/application/Create/CompanyCreator';
import { CreateCompanyRequestMother } from './CreateCompanyRequestMother';
import { CompanyMother } from '../../domain/CompanyMother';
import { CompanyExists } from '../../../../../../src/Contexts/LLBE/Companies/domain/CompanyExists';

let repository: CompanyRepositoryMock;
let creator: CompanyCreator;

beforeEach(() => {
  repository = new CompanyRepositoryMock();
  creator = new CompanyCreator(repository);
});

it('should create a valid company', async () => {
  const request = CreateCompanyRequestMother.empty();

  const company = CompanyMother.fromRequest(request);
  repository.whenSearchThenReturn(null);
  await creator.run(request.id);

  repository.assertLastSavedCompanyIs(company);
});

it('should throw an error when try create a previously created company', async () => {
  const request = CreateCompanyRequestMother.empty();

  const company = CompanyMother.fromCreateRequest(request);

  repository.whenSearchThenReturn(null);
  await creator.run(request.id);

  repository.whenSearchThenReturn(company);

  await expect(creator.run(request.id)).rejects.toThrow(CompanyExists);
});
