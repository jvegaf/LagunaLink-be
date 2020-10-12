import { AfterAll, Before, Given, Then, When } from 'cucumber';
import request from 'supertest';
import app from '../../../../src/app/lagunalink_be/app';
import container from '../../../../src/app/lagunalink_be/config/dependency-injection';
import { EnvironmentArranger } from '../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';
import { CreateUserRequestMother } from '../../../Contexts/LLBE/Users/application/CreateUserRequestMother';
import { UserMother } from '../../../Contexts/LLBE/Users/domain/UserMother';
import { UserRepository } from '../../../../src/Contexts/LLBE/Users/domain/UserRepository';

const userRepository: UserRepository = container.get(
  'App.users.UserRepository'
);
let _request: request.Test;
let _response: request.Response;
let accessToken: string;

// noinspection DuplicatedCode
async function loginUserAccountWithRole(role: string) {
  const userRequest = CreateUserRequestMother.random();
  userRequest.isActive = true;
  userRequest.registered = false;
  userRequest.role = role;
  const user = UserMother.fromRequest(userRequest);
  await userRepository.save(user);

  const signInReqBody = {
    email: user.email.value,
    password: user.password.value,
  };
  const response = await request(app).post('/auth/signin').send(signInReqBody);
  return response.body.access_token;
}

Given('I am logged in with previous created Student Role account', async () => {
  accessToken = await loginUserAccountWithRole('ROLE_STUDENT');
});

Given('I am logged in with previous created Company Role account', async () => {
  accessToken = await loginUserAccountWithRole('ROLE_COMPANY');
});

When(
  'I send a POST request with Auth header to {string} with body:',
  (route: string, body: string) => {
    _request = request(app)
      .post(route)
      .auth(accessToken, {type: 'bearer'})
      .send(JSON.parse(body));
  }
);

Before(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get(
    'App.EnvironmentArranger'
  );
  await (await environmentArranger).arrange();
  accessToken = '';
});

AfterAll(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get(
    'App.EnvironmentArranger'
  );
  await (await environmentArranger).close();
});
