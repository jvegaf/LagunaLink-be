import { AfterAll, Before, Given, Then, When } from 'cucumber';
import request from 'supertest';
import app from '../../../../src/app/lagunalink_be/app';
import container from '../../../../src/app/lagunalink_be/config/dependency-injection';
import { EnvironmentArranger } from '../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';
import { CreateUserRequestMother } from '../../../Contexts/LLBE/Users/application/CreateUserRequestMother';
import { UserMother } from '../../../Contexts/LLBE/Users/domain/UserMother';
import { UserRepository } from '../../../../src/Contexts/LLBE/Users/domain/UserRepository';
import { User } from '../../../../src/Contexts/LLBE/Users/domain/User';
import { StudentRepository } from '../../../../src/Contexts/LLBE/Students/domain/StudentRepository';
import { Student } from '../../../../src/Contexts/LLBE/Students/domain/Student';
import { StudentId } from '../../../../src/Contexts/LLBE/Shared/domain/Students/StudentId';
import { StudentSurnameMother } from '../../../Contexts/LLBE/Students/domain/StudentSurnameMother';
import { StudentNameMother } from '../../../Contexts/LLBE/Students/domain/StudentNameMother';
import { StudentLastnameMother } from '../../../Contexts/LLBE/Students/domain/StudentLastnameMother';
import assert from 'assert';

const userRepository: UserRepository = container.get(
  'App.users.UserRepository'
);
const studentRepository: StudentRepository = container.get(
  'App.students.StudentRepository'
);

let _request: request.Test;

let accessToken: string;

async function createUserWithRole(role: string) {
  const userRequest = CreateUserRequestMother.random();
  userRequest.isActive = true;
  userRequest.registered = false;
  userRequest.role = role;
  const user = UserMother.fromRequest(userRequest);
  await userRepository.save(user);
  return user;
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

function createStudent(user: User) {
  return Student.create(
    new StudentId(user.id.value),
    StudentNameMother.random(),
    StudentSurnameMother.random(),
    StudentLastnameMother.random()
  );
}

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
