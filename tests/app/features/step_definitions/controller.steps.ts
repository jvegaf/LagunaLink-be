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
import { UpgradeJobOpeningRequestMother } from '../../../Contexts/LLBE/JobOpenings/application/UpgradeJobOpeningRequestMother';
import { JobOpeningMother } from '../../../Contexts/LLBE/JobOpenings/domain/JobOpeningMother';
import { StudentIdMother } from '../../../Contexts/LLBE/Shared/domain/Students/StudentIdMother';
import { CompanyIdMother } from '../../../Contexts/LLBE/Shared/domain/Companies/CompanyIdMother';

let _request: request.Test;
let _response: request.Response;
let accessToken: string;
let authRequest: { id: string, email: string, password: string };

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
    return {
        id: userRequest.id,
        email: user.email.value,
        password: passwordPlane,
    };
}

async function registerStudent(id: string) {
    const student = Student.create(
        StudentIdMother.create(id),
        StudentNameMother.random(),
        StudentSurnameMother.random(),
        StudentLastnameMother.random()
    );
    await studentRepository.save(student);
}

async function registerCompany(id: string) {
    const company = Company.create(
        CompanyIdMother.create(id),
        CompanyNameMother.random(),
        CompanyDescriptionMother.random(),
        CompanyAddressMother.random(),
        CompanyPostalCodeMother.random(),
        CompanyRegionMother.random(),
        CompanyCityMother.random()
    );
    await companyRepository.save(company);
}

async function loginUserAccount(authReq: object) {
    const response = await request(app).post('/auth/signin').send(authReq);
    return response.body.access_token;
}

async function registerRandomJobOpening(id: string) {
    const jobOpeningRequest = UpgradeJobOpeningRequestMother.random(id);
    jobOpeningRequest.company = authRequest.id;
    await jobOpenRepository.save(
      JobOpeningMother.fromUpgradeRequest(jobOpeningRequest)
    );
}

Given('I have a Student Role Account', async () => {
    authRequest = await createUser('ROLE_STUDENT');
});

Given('I have a Company Role Account', async () => {
    authRequest = await createUser('ROLE_COMPANY');
});

Given('I have a Student Role Account with id {string}', async (id: string) => {
    authRequest = await createUser('ROLE_STUDENT', id);
});

Given('I have a Company Role Account without complete register', async () => {
    authRequest = await createUser('ROLE_COMPANY', '', false);
});

Given('I am logged in the application', async () => {
    accessToken = await loginUserAccount(authRequest);
});

Given('I published a Job Opening with id {string}', async (id: string) => {
    await registerRandomJobOpening(id);
});

Given('exists a Job Opening with id {string}', async (id: string) => {
    const jobOpeningRequest = UpgradeJobOpeningRequestMother.random(id);
    const jobOpening = JobOpeningMother.fromUpgradeRequest(jobOpeningRequest);
    await jobOpenRepository.save(jobOpening);
});

Given('I am a user with account not yet verified', async () => {
    await createAccountNotVerified();
});

When('I send a GET request to {string}', (route: string) => {
    _request = request(app).get(route);
});

When('I send a GET request with Auth header to {string}', (route: string) => {
    _request = request(app)
      .get(route)
      .auth(accessToken, {type: 'bearer'})
      .send();
});

When(
  'I send a POST request to {string} with body:',
  (route: string, body: string) => {
      _request = request(app)
        .post(route)
        .send(JSON.parse(body));
  }
);

When('I send a POST request with Auth header to {string}', (route: string) => {
    _request = request(app)
        .post(route)
        .auth(accessToken, {type: 'bearer'})
        .send();
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

When(
    'I send a PUT request to {string} with body:',
    (route: string, body: string) => {
        _request = request(app)
            .put(route)
            .auth(accessToken, {type: 'bearer'})
            .send(JSON.parse(body));
    }
);

When(
    'I send a PUT request with Auth header to {string} with body:',
    (route: string, body: string) => {
        _request = request(app)
            .put(route)
            .auth(accessToken, {type: 'bearer'})
            .send(JSON.parse(body));
    }
);

When(
    'I send a DELETE request to {string}',
    (route: string) => {
        _request = request(app)
            .delete(route)
            .auth(accessToken, {type: 'bearer'})
            .send();
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
    authRequest = {id: '', email: '', password: ''};
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
