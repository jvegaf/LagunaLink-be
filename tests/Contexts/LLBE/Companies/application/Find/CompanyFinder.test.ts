import { CompanyRepositoryMock } from '../../__mocks__/CompanyRepositoryMock';
import { CompanyFinder } from '../../../../../../src/Contexts/LLBE/Companies/application/Find/CompanyFinder';
import { CompanyNotFound } from '../../../../../../src/Contexts/LLBE/Companies/domain/CompanyNotFound';
import { CreateCompanyRequestMother } from '../Create/CreateCompanyRequestMother';
import { CompanyMother } from '../../domain/CompanyMother';
import { CompanyIdMother } from '../../../Shared/domain/Companies/CompanyIdMother';

let repository: CompanyRepositoryMock;
let finder: CompanyFinder;

beforeEach(() => {
  repository = new CompanyRepositoryMock();
  finder = new CompanyFinder(repository);
});

it('should throw a CompanyNotFound exception if company not exists', async () => {
  const companyIdFake = CompanyIdMother.random();

  repository.whenSearchThenReturn(null);

  await expect(finder.run(companyIdFake)).rejects.toThrow(CompanyNotFound);
});

it('should found a valid company', async () => {
  const request = CreateCompanyRequestMother.random();
  const company = CompanyMother.fromCreateRequest(request);

  repository.whenSearchThenReturn(company);

  await expect(finder.run(company.id)).resolves.toEqual(company);
});
