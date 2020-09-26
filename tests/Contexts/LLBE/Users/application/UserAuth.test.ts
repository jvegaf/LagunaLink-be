import { UserMother } from '../domain/UserMother';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { CreateUserRequestMother } from './CreateUserRequestMother';
import { UserEmailExists } from '../../../../../src/Contexts/LLBE/Users/application/UserEmailExists';
import { EncoderMock } from '../__mocks__/EncoderMock';
import { UserAuth } from '../../../../../src/Contexts/LLBE/Users/application/UserAuth';
import { UserUpdaterMock } from '../__mocks__/UserUpdaterMock';
import { AuthUserRequestMother } from './AuthUserRequestMother';
import { UserAuthFail } from '../../../../../src/Contexts/LLBE/Users/application/UserAuthFail';
import { AuthUserRequest } from '../../../../../src/Contexts/LLBE/Users/application/AuthUserRequest';
import { AccountNotConfirmed } from '../../../../../src/Contexts/LLBE/Users/application/AccountNotConfirmed';
import { AuthResponse } from '../../../../../src/Contexts/LLBE/Users/application/AuthResponse';

let repository: UserRepositoryMock;
let encoder: EncoderMock;

let updater: UserUpdaterMock;

let auth: UserAuth;

beforeEach(() => {
  repository = new UserRepositoryMock();
  encoder = new EncoderMock();
  updater = new UserUpdaterMock(repository);
  auth = new UserAuth(encoder, repository, updater);
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

  await expect(auth.run(request)).resolves.toBeInstanceOf(AuthResponse);
});
