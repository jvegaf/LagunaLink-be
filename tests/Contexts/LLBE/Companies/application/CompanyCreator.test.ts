import { CompanyRepositoryMock } from '../__mocks__/CompanyRepositoryMock';
import { CompanyCreator } from '../../../../../src/Contexts/LLBE/Companies/application/CompanyCreator';
import { CreateCompanyRequestMother } from './CreateCompanyRequestMother';
import { CompanyMother } from '../domain/CompanyMother';
import { UserUpdateRegistered } from '../../../../../src/Contexts/LLBE/Users/application/UserUpdateRegistered';
import { UserUpdateRegisteredMock } from '../../Shared/__mocks__/UserUpdateRegisteredMock';
import { UserRepositoryMock } from '../../Users/__mocks__/UserRepositoryMock';

let repository: CompanyRepositoryMock;
let userUpdRegMock: UserUpdateRegistered;
let creator: CompanyCreator;

beforeEach(() => {
  userUpdRegMock = new UserUpdateRegisteredMock(new UserRepositoryMock());
  repository = new CompanyRepositoryMock();
  creator = new CompanyCreator(repository, userUpdRegMock);
});

it('should create a valid company', async () => {
  const request = CreateCompanyRequestMother.random();

  const company = CompanyMother.fromRequest(request);
  repository.whenSearchThenReturn(null);
  await creator.run(request);

  repository.assertLastSavedCompanyIs(company);
});
