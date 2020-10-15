import assert from 'assert';
import { AfterAll, Before, Given, Then, When } from 'cucumber';
import request from 'supertest';
import app from '../../../../src/app/lagunalink_be/app';
import container from '../../../../src/app/lagunalink_be/config/dependency-injection';
import { EnvironmentArranger } from '../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';
import { UserRepository } from '../../../../src/Contexts/LLBE/Users/domain/UserRepository';
import { StudentRepository } from '../../../../src/Contexts/LLBE/Students/domain/StudentRepository';
import { CreateUserRequestMother } from '../../../Contexts/LLBE/Users/application/CreateUserRequestMother';
import { UserMother } from '../../../Contexts/LLBE/Users/domain/UserMother';
import { User } from '../../../../src/Contexts/LLBE/Users/domain/User';
import { Student } from '../../../../src/Contexts/LLBE/Students/domain/Student';
import { StudentId } from '../../../../src/Contexts/LLBE/Shared/domain/Students/StudentId';
import { StudentNameMother } from '../../../Contexts/LLBE/Students/domain/StudentNameMother';
import { StudentSurnameMother } from '../../../Contexts/LLBE/Students/domain/StudentSurnameMother';
import { StudentLastnameMother } from '../../../Contexts/LLBE/Students/domain/StudentLastnameMother';

let _request: request.Test;
let _response: request.Response;
let accessToken: string;

const userRepository: UserRepository = container.get(
  'App.users.UserRepository'
);

const studentRepository: StudentRepository = container.get(
  'App.students.StudentRepository'
);

async function createUserWithRole(role: string) {
  const userRequest = CreateUserRequestMother.random();
  userRequest.isActive = true;
  userRequest.registered = false;
  userRequest.role = role;
  const user = UserMother.fromRequest(userRequest);
  await userRepository.save(user);
  return user;
}

function createStudent(user: User) {
  return Student.create(
    new StudentId(user.id.value),
    StudentNameMother.random(),
    StudentSurnameMother.random(),
    StudentLastnameMother.random()
  );
}

async function loginUserAccount(user: User) {
  const signInReqBody = {
    email: user.email.value,
    password: user.password.value,
  };
  const response = await request(app).post('/auth/signin').send(signInReqBody);
  return response.body.access_token;
}

Given('I am logged in with previous created Student Role account', async () => {
  const user = await createUserWithRole('ROLE_STUDENT');
  accessToken = await loginUserAccount(user);
});

Given('I am logged in with previous created Company Role account', async () => {
  const user = await createUserWithRole('ROLE_COMPANY');
  accessToken = await loginUserAccount(user);
});

Given(
  'I am logged in with a Student Role account previously registered',
  async () => {
    const user = await createUserWithRole('ROLE_STUDENT');
    const student = createStudent(user);
    await studentRepository.save(student);
    accessToken = await loginUserAccount(user);
  }
);

When(
  'I send a POST request with Auth header to {string} with body:',
  (route: string, body: string) => {
    _request = request(app)
      .post(route)
      .auth(accessToken, { type: 'bearer' })
      .send(JSON.parse(body));
  }
);

When(
  'I send a PUT request with Auth header to {string} with body:',
  (route: string, body: string) => {
    _request = request(app)
      .put(route)
      .auth(accessToken, { type: 'bearer' })
      .send(JSON.parse(body));
  }
);

Given('I send a GET request to {string}', (route: string) => {
  _request = request(app).get(route);
});

Given(
  'I send a POST request to {string} with body:',
  (route: string, body: string) => {
    _request = request(app).post(route).send(JSON.parse(body));
  }
);

Given(
  'I send a PUT request to {string} with body:',
  (route: string, body: string) => {
    _request = request(app).put(route).send(JSON.parse(body));
  }
);

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

Then('the response content should be:', (response) => {
  assert.strictEqual(_response.body, JSON.parse(response));
});

Before(async () => {
  accessToken = '';
  const environmentArranger: Promise<EnvironmentArranger> = container.get(
    'App.EnvironmentArranger'
  );
  await (await environmentArranger).arrange();
});

AfterAll(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get(
    'App.EnvironmentArranger'
  );
  await (await environmentArranger).close();
});
