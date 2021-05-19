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
import { Student } from '../../../../src/Contexts/LLBE/Students/domain/Student';
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
import { CompanyRepository } from '../../../../src/Contexts/LLBE/Companies/domain/CompanyRepository';
import { JobOpeningRepository } from '../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpeningRepository';
import { UpgradeJobOpeningRequestMother } from '../../../Contexts/LLBE/JobOpenings/application/Update/UpgradeJobOpeningRequestMother';
import { JobOpeningMother } from '../../../Contexts/LLBE/JobOpenings/domain/JobOpeningMother';
import { StudentIdMother } from '../../../Contexts/LLBE/Shared/domain/Students/StudentIdMother';
import { CompanyIdMother } from '../../../Contexts/LLBE/Shared/domain/Companies/CompanyIdMother';
import { CreateJobOpeningRequestMother } from '../../../Contexts/LLBE/JobOpenings/application/Create/CreateJobOpeningRequestMother';
import path from 'path';
import { StudentLangsMother } from '../../../Contexts/LLBE/Students/domain/StudentLangsMother';
import { QualificationMother } from '../../../Contexts/LLBE/Students/domain/QualificationMother';
import { JobExperiencesMother } from '../../../Contexts/LLBE/Students/domain/JobExperiencesMother';

let _request: request.Test;
let _response: request.Response;
let accessToken: string;
let authRequest: { id: string; email: string; password: string };

const userRepository: UserRepository = container.get('App.users.UserRepository');

const studentRepository: StudentRepository = container.get('App.students.StudentRepository');

const companyRepository: CompanyRepository = container.get('App.companies.CompanyRepository');

const jobOpenRepository: JobOpeningRepository = container.get('App.jobOpenings.JobOpeningRepository');

async function createAccountNotVerified() {
  const userRequest = CreateUserRequestMother.random();
  userRequest.email = 'ramoncin@gmail.com';
  userRequest.password = hashSync('123123', 10);
  userRequest.isActive = false;
  userRequest.registered = false;
  const user = UserMother.fromRequest(userRequest);
  await userRepository.save(user);
}

async function createUser(role: string, id = '', registered = true) {
  const userRequest = CreateUserRequestMother.random();
  const passwordPlane = userRequest.password;
  if (id !== '') {
    userRequest.id = id;
  }
  userRequest.password = hashSync(userRequest.password, 10);
  userRequest.isActive = true;
  userRequest.registered = registered;
  userRequest.role = role;
  const user = UserMother.fromRequest(userRequest);
  await userRepository.save(user);
  if (registered) {
    await register(userRequest.id, userRequest.role);
  }
  return {
    id: userRequest.id,
    email: userRequest.email,
    password: passwordPlane,
  };
}

const ROLE_COMPANY = 'ROLE_COMPANY';

async function register(id: string, role: string) {
  if (role === 'ROLE_STUDENT') {
    const student = Student.create({
      id: StudentIdMother.create(id),
      name: StudentNameMother.random(),
      surname: StudentSurnameMother.random(),
      lastname: StudentLastnameMother.random(),
      languages: StudentLangsMother.random(),
      qualification: QualificationMother.random(),
      jobexperiences: JobExperiencesMother.random()
    });

    await studentRepository.save(student);
  }

  if (role === ROLE_COMPANY) {
    const company = Company.create({
      id: CompanyIdMother.create(id),
      name: CompanyNameMother.random(),
      description: CompanyDescriptionMother.random(),
      address: CompanyAddressMother.random(),
      postalCode: CompanyPostalCodeMother.random(),
      region: CompanyRegionMother.random(),
      city: CompanyCityMother.random()
    });
    await companyRepository.save(company);
  }
}

async function loginUserAccount(authReq: object) {
  const response = await request(app).post('/auth/signin').send(authReq);
  return response.body.access_token;
}

async function registerRandomJobOpening() {
  const jobOpening = JobOpeningMother.random();
  await jobOpenRepository.save(jobOpening);
}

async function registerRandomJobOpeningWithId(id: string, companyId = '') {
  const jobOpeningRequest = UpgradeJobOpeningRequestMother.random(id);
  if (companyId !== '') {
    jobOpeningRequest.company = companyId;
  }
  await jobOpenRepository.save(JobOpeningMother.fromUpgradeRequest(jobOpeningRequest));
}

async function registerSeveralJobOpenings() {
  for (let i = 0; i < 10; i++) {
    await registerRandomJobOpening();
  }
}

async function registerSeveralCompanies() {
  for (let i = 0; i < 10; i++) {
    const user = await createUser(ROLE_COMPANY);
    await register(user.id, ROLE_COMPANY);
  }
}

async function registerSeveralJobOpeningsOfCompany(companyId: string, quantity?: number) {
  const amount = quantity !== undefined ? quantity : 10;
  for (let i = 0; i < amount; i++) {
    const comReq = CreateJobOpeningRequestMother.randomOfCompany(companyId);
    const job = JobOpeningMother.fromCreateRequest(comReq);
    await jobOpenRepository.save(job);
  }
}

Given('I have a Student Role Account', async () => {
  authRequest = await createUser('ROLE_STUDENT');
});

Given('I have a Company Role Account', async () => {
  authRequest = await createUser(ROLE_COMPANY);
});

Given('Previously was registered a company with id {string}', async (id: string) => {
  authRequest = await createUser(ROLE_COMPANY, id);
});

Given('I have a Student Role Account with id {string}', async (id: string) => {
  authRequest = await createUser('ROLE_STUDENT', id);
});

Given('I have a Company Role Account with id {string}', async (id: string) => {
  authRequest = await createUser(ROLE_COMPANY, id);
});

Given('I have a Student Role Account without complete register', async () => {
  authRequest = await createUser('ROLE_STUDENT', '', false);
});

Given('I have a Company Role Account without complete register', async () => {
  authRequest = await createUser(ROLE_COMPANY, '', false);
});

Given('I am logged in the application', async () => {
  accessToken = await loginUserAccount(authRequest);
});

Given('I published a Job Opening with id {string}', async (id: string) => {
  await registerRandomJobOpeningWithId(id, authRequest.id);
});

Given('exists a Job Opening with id {string}', async (id: string) => {
  const jobOpeningRequest = UpgradeJobOpeningRequestMother.random(id);
  const jobOpening = JobOpeningMother.fromUpgradeRequest(jobOpeningRequest);
  await jobOpenRepository.save(jobOpening);
});

Given('I am a user with account not yet verified', async () => {
  await createAccountNotVerified();
});
Given('Previously was created a Job Opening with id {string}', async (id: string) => {
  await registerRandomJobOpeningWithId(id);
});

Given('Several Job Openings were previously created', async () => {
  await registerSeveralJobOpenings();
});

Given('Several Companies were previously created', async () => {
  await registerSeveralCompanies();
});

Given('This Company published several Job Openings', async () => {
  await registerSeveralJobOpeningsOfCompany(authRequest.id);
});

When('I send a GET request to {string}', (route: string) => {
  if (accessToken === '') {
    _request = request(app).get(route).send();
  }
  _request = request(app).get(route).auth(accessToken, { type: 'bearer' }).send();
});

When('I send a POST request to {string}', (route: string) => {
  if (accessToken === '') {
    _request = request(app).post(route).send();
  }
  _request = request(app).post(route).auth(accessToken, { type: 'bearer' }).send();
});

When('I send a POST request to {string} with body:', (route: string, body: string) => {
  if (accessToken === '') {
    _request = request(app).post(route).send(JSON.parse(body));
  }
  _request = request(app).post(route).auth(accessToken, { type: 'bearer' }).send(JSON.parse(body));
});

When('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = request(app).put(route).auth(accessToken, { type: 'bearer' }).send(JSON.parse(body));
});

When('I send a DELETE request to {string}', (route: string) => {
  _request = request(app).delete(route).auth(accessToken, { type: 'bearer' }).send();
});

When('Upload a image in a PUT request to {string}', (route: string) => {
  _request = request(app)
    .put(route)
    .auth(accessToken, { type: 'bearer' })
    .attach('image', path.join(__dirname, 'fakelogo.jpg'));
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

Then('the response content should be:', response => {
  assert.strictEqual(_response.body, JSON.parse(response));
});

Then('print the response', () => {
  console.log(_response.body);
});

Before(async () => {
  accessToken = '';
  authRequest = { id: '', email: '', password: '' };
  const environmentArranger: Promise<EnvironmentArranger> = container.get('App.EnvironmentArranger');
  await (await environmentArranger).arrange();
});

AfterAll(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('App.EnvironmentArranger');
  await (await environmentArranger).close();
});
