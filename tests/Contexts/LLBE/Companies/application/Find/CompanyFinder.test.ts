import { CompanyRepositoryMock } from '../../__mocks__/CompanyRepositoryMock';
import { CompanyFinder } from '../../../../../../src/Contexts/LLBE/Companies/application/Find/CompanyFinder';
import { CompanyNotFound } from '../../../../../../src/Contexts/LLBE/Companies/domain/CompanyNotFound';
import { CreateCompanyRequestMother } from '../Create/CreateCompanyRequestMother';
import { CompanyMother } from '../../domain/CompanyMother';
import { CompanyIdMother } from '../../../Shared/domain/Companies/CompanyIdMother';
import { CompanyFinderRequest } from '../../../../../../src/Contexts/LLBE/Companies/application/Find/CompanyFinderRequest';

let repository: CompanyRepositoryMock;
let finder: CompanyFinder;

beforeEach(() => {
  repository = new CompanyRepositoryMock();
  finder = new CompanyFinder(repository);
});

it('should throw a CompanyNotFound exception if company not exists', async () => {
  const companyIdFake = CompanyIdMother.random();
  const req: CompanyFinderRequest = {
    companyId: companyIdFake.value,
    accountOwner: false
  };
  repository.whenSearchThenReturn(null);

  await expect(finder.run(req)).rejects.toThrow(CompanyNotFound);
});

it('should found a valid company', async () => {
  const request = CreateCompanyRequestMother.random();
  const company = CompanyMother.fromCreateRequest(request);

  repository.whenSearchThenReturn(company);

  const req: CompanyFinderRequest = {
    companyId: company.id.value,
    accountOwner: false
  };

  await expect(finder.run(req)).resolves.toEqual(company);
});
