import app from '../../../../src/app/lagunalink_be/app';
import { CreateUserRequestMother } from '../../../Contexts/LLBE/Users/application/CreateUserRequestMother';
import { UserMother } from '../../../Contexts/LLBE/Users/domain/UserMother';
import { UserRepository } from '../../../../src/Contexts/LLBE/Users/domain/UserRepository';
import container from '../../../../src/app/lagunalink_be/config/dependency-injection';
import request from 'supertest';

const userRepository: UserRepository = container.get(
  'App.users.UserRepository'
);

it('should can register a student', async () => {
  const userRequest = CreateUserRequestMother.random();
  userRequest.role = 'ROLE_STUDENT';
  userRequest.isActive = true;
  const user = UserMother.fromRequest(userRequest);
  await userRepository.save(user);

  const signInReqBody = {
    email: user.email.value,
    password: user.password.value,
  };
  const response = await request(app).post('/auth/signin').send(signInReqBody);
  const accessToken = response.body.access_token;

  const studentReqBody = {
    id: user.id.value,
    name: 'Pepito',
    surname: 'Perez',
    lastname: 'Lopez',
  };

  await request(app)
    .post('/students')
    .auth(accessToken, { type: 'bearer' })
    .send(studentReqBody)
    .expect(201);
});
