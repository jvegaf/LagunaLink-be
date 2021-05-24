import { CreateUserRequest } from '../../../../../src/Contexts/LLBE/Users/application/CreateUserRequest';
import { UserId } from '../../../../../src/Contexts/LLBE/Shared/domain/Users/UserId';
import { UserEmail } from '../../../../../src/Contexts/LLBE/Users/domain/UserEmail';
import { UserPassword } from '../../../../../src/Contexts/LLBE/Users/domain/UserPassword';
import { UserIsActive } from '../../../../../src/Contexts/LLBE/Users/domain/UserIsActive';
import { UserCreatedAt } from '../../../../../src/Contexts/LLBE/Users/domain/UserCreatedAt';
import { UserUpdatedAt } from '../../../../../src/Contexts/LLBE/Users/domain/UserUpdatedAt';
import { UserIdMother } from '../../Shared/domain/Users/UserIdMother';
import { UserPasswordMother } from '../domain/UserPasswordMother';
import { UserEmailMother } from '../domain/UserEmailMother';
import { UserIsActiveMother } from '../domain/UserIsActiveMother';
import { UserCreatedAtMother } from '../domain/UserCreatedAtMother';
import { UserRole } from '../../../../../src/Contexts/LLBE/Users/domain/UserRole';
import { UserRoleMother } from '../domain/UserRoleMother';

export class CreateUserRequestMother {
  static create(
    id: UserId,
    email: UserEmail,
    password: UserPassword,
    isActive: UserIsActive,
    role: UserRole,
    createdAt: UserCreatedAt,
    updatedAt: UserUpdatedAt
  ): CreateUserRequest {
    return {
      id: id.value,
      email: email.value,
      password: password.value,
      isActive: isActive.value,
      role: role.value,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  }

  static random(): CreateUserRequest {
    return this.create(
      UserIdMother.random(),
      UserEmailMother.random(),
      UserPasswordMother.random(),
      UserIsActiveMother.random(),
      UserRoleMother.random(),
      UserCreatedAtMother.random(),
      UserCreatedAtMother.random()
    );
  }
}
