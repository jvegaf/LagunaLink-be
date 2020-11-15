import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserUpdatedAt } from './UserUpdatedAt';
import { UserPassword } from './UserPassword';
import { UserEmail } from './UserEmail';
import { UserIsActive } from './UserIsActive';
import { UserCreatedAt } from './UserCreatedAt';
import { UserId } from '../../Shared/domain/Users/UserId';
import { UserRole } from './UserRole';
import { UserRegistered } from './UserRegistered';
import { Timestamp } from '../../Shared/domain/Timestamp';

export class User extends AggregateRoot {
  readonly id: UserId;
  readonly email: UserEmail;
  readonly password: UserPassword;
  readonly isActive: UserIsActive;
  readonly role: UserRole;
  readonly registered: UserRegistered;
  readonly createdAt: UserCreatedAt;
  readonly updatedAt: UserUpdatedAt;

  constructor(
    id: UserId,
    email: UserEmail,
    password: UserPassword,
    isActive: UserIsActive,
    role: UserRole,
    registered: UserRegistered,
    createdAt: UserCreatedAt,
    updatedAt: UserUpdatedAt
  ) {
    super();
    this.id = id;
    this.email = email;
    this.password = password;
    this.isActive = isActive;
    this.role = role;
    this.registered = registered;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(
    id: UserId,
    email: UserEmail,
    password: UserPassword,
    isActive: UserIsActive,
    role: UserRole,
    registered: UserRegistered,
    createdAt: UserCreatedAt,
    updatedAt: UserUpdatedAt
  ): User {
    return new User(
      id,
      email,
      password,
      isActive,
      role,
      registered,
      createdAt,
      updatedAt
    );
  }

  static fromPrimitives(plaindata: {
    id: string;
    email: string;
    password: string;
    isActive: boolean;
    role: string;
    registered: boolean;
    createdAt: string;
    updatedAt: string;
  }) {
    return new User(
      new UserId(plaindata.id),
      new UserEmail(plaindata.email),
      new UserPassword(plaindata.password),
      new UserIsActive(plaindata.isActive),
      new UserRole(plaindata.role),
      new UserRegistered(plaindata.registered),
      new UserCreatedAt(plaindata.createdAt),
      new UserUpdatedAt(plaindata.updatedAt)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value,
      isActive: this.isActive.value,
      role: this.role.value,
      registered: this.registered.value,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  activate(): User {
    return new User(
      this.id,
      this.email,
      this.password,
      new UserIsActive(true),
      this.role,
      this.registered,
      this.createdAt,
      new UserUpdatedAt(Timestamp.now())
    );
  }

  register(): User {
    return new User(
      this.id,
      this.email,
      this.password,
      this.isActive,
      this.role,
      new UserRegistered(true),
      this.createdAt,
      new UserUpdatedAt(Timestamp.now())
    );
  }
}
