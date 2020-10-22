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
import { StudentSurnameMother } from '../../../Contexts/LLBE/Students/domain/StudentSurnameMother';
import { StudentLastnameMother } from '../../../Contexts/LLBE/Students/domain/StudentLastnameMother';
import { hashSync } from 'bcryptjs';
import { StudentNameMother } from '../../../Contexts/LLBE/Students/domain/StudentNameMother';
import { Company } from '../../../../src/Contexts/LLBE/Companies/domain/Company';
import { CompanyNameMother } from '../../../Contexts/LLBE/Companies/domain/CompanyNameMother';
import { CompanyDescriptionMother } from '../../../Contexts/LLBE/Companies/domain/CompanyDescriptionMother';
import { CompanyAddressMother } from '../../../Contexts/LLBE/Companies/domain/CompanyAddressMother';
import { CompanyPostalCodeMother } from '../../../Contexts/LLBE/Companies/domain/CompanyPostalCodeMother';
import { CompanyRegionMother } from '../../../Contexts/LLBE/Companies/domain/CompanyRegionMother';
import { CompanyCityMother } from '../../../Contexts/LLBE/Companies/domain/CompanyCityMother';
import { CompanyId } from '../../../../src/Contexts/LLBE/Shared/domain/Companies/CompanyId';
import { CompanyRepository } from '../../../../src/Contexts/LLBE/Companies/domain/CompanyRepository';
import { JobOpeningRepository } from '../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpeningRepository';
import { CreateJobOpeningRequestMother } from '../../../Contexts/LLBE/JobOpenings/application/CreateJobOpeningRequestMother';
import { UpgradeJobOpeningRequestMother } from '../../../Contexts/LLBE/JobOpenings/application/UpgradeJobOpeningRequestMother';
import { JobOpeningMother } from '../../../Contexts/LLBE/JobOpenings/domain/JobOpeningMother';

let _request: request.Test;
let _response: request.Response;
let accessToken: string;

const userRepository: UserRepository = container.get(
  'App.users.UserRepository'
);

const studentRepository: StudentRepository = container.get(
  'App.students.StudentRepository'
);

const companyRepository: CompanyRepository = container.get(
  'App.companies.CompanyRepository'
);

const jobOpenRepository: JobOpeningRepository = container.get(
  'App.jobOpenings.JobOpeningRepository'
);

async function createUserWithRole(role: string) {
  const userRequest = CreateUserRequestMother.random();
  const passwordPlane = userRequest.password;
  userRequest.password = hashSync(userRequest.password, 10);
  userRequest.isActive = true;
  userRequest.registered = false;
  userRequest.role = role;
  const user = UserMother.fromRequest(userRequest);
  await userRepository.save(user);
  return {
    id: userRequest.id,
    email: user.email.value,
    password: passwordPlane,
  };
}

function createStudent(user: User) {
  return Student.create(
    new StudentId(user.id.value),
    StudentNameMother.random(),
    StudentSurnameMother.random(),
    StudentLastnameMother.random()
  );
}

function createCompany(user: User) {
  return Company.create(
    new CompanyId(user.id.value),
    CompanyNameMother.random(),
    CompanyDescriptionMother.random(),
    CompanyAddressMother.random(),
    CompanyPostalCodeMother.random(),
    CompanyRegionMother.random(),
    CompanyCityMother.random()
  );
}

async function loginUserAccount(authReq: object) {
  const response = await request(app).post('/auth/signin').send(authReq);
  return response.body.access_token;
}

async function saveJobOpening(id: string) {
  const jobOpeningRequest = UpgradeJobOpeningRequestMother.random(id);
  await jobOpenRepository.save(
    JobOpeningMother.fromUpgradeRequest(jobOpeningRequest)
  );
}

Given('I am logged in with previous created Student Role account', async () => {
  const authReq = await createUserWithRole('ROLE_STUDENT');
  accessToken = await loginUserAccount(authReq);
});

Given('I am logged in with previous created Company Role account', async () => {
  const authReq = await createUserWithRole('ROLE_COMPANY');
  accessToken = await loginUserAccount(authReq);
});

Given('I published a Job Opening with id {string}', async (id: string) => {
  await saveJobOpening(id);
});

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
  'I am logged in with a Student Role account previously registered',
  async () => {
    const authReq = await createUserWithRole('ROLE_STUDENT');
    const userReq = CreateUserRequestMother.random();
    userReq.id = authReq.id;
    userReq.role = 'ROLE_STUDENT';
    userReq.isActive = true;
    userReq.registered = false;
    const user = UserMother.fromRequest(userReq);
    const student = createStudent(user);
    await studentRepository.save(student);
    accessToken = await loginUserAccount(authReq);
  }
);

Given(
  'I am logged in with a Company Role account previously registered',
  async () => {
    const authReq = await createUserWithRole('ROLE_COMPANY');
    const userReq = CreateUserRequestMother.random();
    userReq.id = authReq.id;
    userReq.role = 'ROLE_COMPANY';
    userReq.isActive = true;
    userReq.registered = false;
    const user = UserMother.fromRequest(userReq);
    const company = createCompany(user);
    await companyRepository.save(company);
    accessToken = await loginUserAccount(authReq);
  }
);

Given('exists a Job Opening with id {string}', async () => {});

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
  'I send a PUT request to {string} with body:',
  (route: string, body: string) => {
    _request = request(app)
      .put(route)
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
