import {UserRepositoryMock} from '../__mocks__/UserRepositoryMock';
import {TokenGeneratorMock} from '../__mocks__/TokenGeneratorMock';
import {UserAuth} from '../../../../../src/Contexts/LLBE/Users/application/UserAuth';
import {AuthUserRequestMother} from './AuthUserRequestMother';
import {UserAuthFail} from '../../../../../src/Contexts/LLBE/Users/application/UserAuthFail';
import {AuthUserRequest} from '../../../../../src/Contexts/LLBE/Users/application/AuthUserRequest';
import {AccountNotConfirmed} from '../../../../../src/Contexts/LLBE/Users/application/AccountNotConfirmed';
import {UserProfiler} from '../../../../../src/Contexts/LLBE/Shared/application/Users/UserProfiler';
import {UserProfilerMock} from '../__mocks__/UserProfilerMock';
import {CompanyRepositoryMock} from '../../Companies/__mocks__/CompanyRepositoryMock';
import {StudentRepositoryMock} from '../../Students/__mocks__/StudentRepositoryMock';

let repository: UserRepositoryMock;
let tokenGenerator: TokenGeneratorMock;
let profiler: UserProfiler;

let auth: UserAuth;

beforeEach(() => {
  repository = new UserRepositoryMock();
  tokenGenerator = new TokenGeneratorMock();
  profiler = new UserProfilerMock(new StudentRepositoryMock(), new CompanyRepositoryMock());
  auth = new UserAuth(tokenGenerator, repository, profiler);
});

it('should throw a UserAuthFail with non exist user', async () => {
  const request = AuthUserRequestMother.random();

  await expect(auth.run(request)).rejects.toThrow(UserAuthFail);
});

it('should throw a UserAuthFail when de password is invalid', async () => {
  const request: AuthUserRequest = {
    email: 'pepe@yo.com',
    password: '123123',
  };

  await expect(auth.run(request)).rejects.toThrow(UserAuthFail);
});

it('should throw a AccountNotConfirmed when try sign in and the account is not active', async () => {
  const request: AuthUserRequest = {
    email: 'pepito@yo.com',
    password: '123123',
  };

  await expect(auth.run(request)).rejects.toThrow(AccountNotConfirmed);
});

it('should get a success AuthResponse', async () => {
  const request: AuthUserRequest = {
    email: 'juan@yo.com',
    password: '123123',
  };

  await expect(auth.run(request)).resolves.toBeTruthy();
});
