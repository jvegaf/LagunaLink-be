import request from 'supertest';
import container from '../../../src/app/lagunalink_be/config/dependency-injection';
import { CreateUserRequestMother } from '../../Contexts/LLBE/Users/application/CreateUserRequestMother';
import app from '../../../src/app/lagunalink_be/app';
import { UserRepository } from '../../../src/Contexts/LLBE/Users/domain/UserRepository';
import { UserMother } from '../../Contexts/LLBE/Users/domain/UserMother';
import { StudentNameMother } from '../../Contexts/LLBE/Students/domain/StudentNameMother';
import { StudentSurnameMother } from '../../Contexts/LLBE/Students/domain/StudentSurnameMother';
import { StudentLastnameMother } from '../../Contexts/LLBE/Students/domain/StudentLastnameMother';

const userRepository: UserRepository = container.get(
  'App.users.UserRepository'
);

it('should can register a student', async () => {
  const userRequest = CreateUserRequestMother.random();
  userRequest.role = 'ROLE_STUDENT';
  userRequest.isActive = true;
  userRequest.registered = false;
  const user = UserMother.fromRequest(userRequest);
  await userRepository.save(user);

  const signInReqBody = {
    email: user.email.value,
    password: user.password.value,
  };
  const response = await request(app).post('/auth/signin').send(signInReqBody);
  const accessToken = response.body.access_token;

  const studentReqBody = {
    name: StudentNameMother.random().value,
    surname: StudentSurnameMother.random().value,
    lastname: StudentLastnameMother.random().value,
  };

  await request(app)
    .post('/students')
    .auth(accessToken, { type: 'bearer' })
    .send(studentReqBody)
    .expect(201);
});

it('should get a error when try register a student with company account', async () => {
  const userRequest = CreateUserRequestMother.random();
  userRequest.role = 'ROLE_COMPANY';
  userRequest.isActive = true;
  userRequest.registered = false;
  const user = UserMother.fromRequest(userRequest);
  await userRepository.save(user);

  const signInReqBody = {
    email: user.email.value,
    password: user.password.value,
  };
  const response = await request(app).post('/auth/signin').send(signInReqBody);
  const accessToken = response.body.access_token;

  const studentReqBody = {
    name: StudentNameMother.random().value,
    surname: StudentSurnameMother.random().value,
    lastname: StudentLastnameMother.random().value,
  };

  await request(app)
    .post('/students')
    .auth(accessToken, { type: 'bearer' })
    .send(studentReqBody)
    .expect(402);
});
