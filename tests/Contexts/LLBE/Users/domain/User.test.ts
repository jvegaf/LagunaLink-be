import { CreateUserRequestMother } from '../application/CreateUserRequestMother';
import { UserMother } from './UserMother';

describe('User', () => {

  it('should return a new user instance', () => {
    const request = CreateUserRequestMother.random();

    const user = UserMother.fromRequest(request);

    expect(user.email.value).toBe(request.email);
    expect(user.password.value).toBe(request.password);
    expect(user.isActive.value).toBe(request.isActive);
  });
});
