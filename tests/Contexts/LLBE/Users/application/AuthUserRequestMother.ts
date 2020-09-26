import { UserEmail } from '../../../../../src/Contexts/LLBE/Users/domain/UserEmail';
import { UserPassword } from '../../../../../src/Contexts/LLBE/Users/domain/UserPassword';
import { UserPasswordMother } from '../domain/UserPasswordMother';
import { UserEmailMother } from '../domain/UserEmailMother';
import { AuthUserRequest } from '../../../../../src/Contexts/LLBE/Users/application/AuthUserRequest';

export class AuthUserRequestMother {
  static create(email: UserEmail, password: UserPassword): AuthUserRequest {
    return {
      email: email.value,
      password: password.value,
    };
  }

  static random(): AuthUserRequest {
    return this.create(UserEmailMother.random(), UserPasswordMother.random());
  }
}
