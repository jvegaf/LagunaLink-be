import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserUpdatedAt } from './UserUpdatedAt';
import { UserPassword } from './UserPassword';
import { UserEmail } from './UserEmail';
import { UserIsActive } from './UserIsActive';
import { UserCreatedAt } from './UserCreatedAt';
import { UserId } from '../../Shared/domain/Users/UserId';
import { UserRole } from './UserRole';
import { UserAvatar } from './UserAvatar';

export class User extends AggregateRoot {
  readonly id: UserId;
  readonly email: UserEmail;
  readonly password: UserPassword;
  readonly isActive: UserIsActive;
  readonly role: UserRole;
  readonly avatar: UserAvatar;
  readonly createdAt: UserCreatedAt;
  readonly updatedAt: UserUpdatedAt;

  static create(
    id: UserId,
    email: UserEmail,
    password: UserPassword,
    isActive: UserIsActive,
    role: UserRole,
    avatar: UserAvatar,
    createdAt: UserCreatedAt,
    updatedAt: UserUpdatedAt
  ): User {
    return new User(id, email, password, isActive, role, avatar, createdAt, updatedAt);
  }

  static fromPrimitives(plaindata: {
    id: string;
    email: string;
    password: string;
    isActive: boolean;
    role: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  }) {
    return new User(
      new UserId(plaindata.id),
      new UserEmail(plaindata.email),
      new UserPassword(plaindata.password),
      new UserIsActive(plaindata.isActive),
      new UserRole(plaindata.role),
      new UserAvatar(plaindata.avatar),
      new UserCreatedAt(plaindata.createdAt),
      new UserUpdatedAt(plaindata.updatedAt)
    );
  }

  constructor(
    id: UserId,
    email: UserEmail,
    password: UserPassword,
    isActive: UserIsActive,
    role: UserRole,
    avatar: UserAvatar,
    createdAt: UserCreatedAt,
    updatedAt: UserUpdatedAt
  ) {
    super();
    this.id = id;
    this.email = email;
    this.password = password;
    this.isActive = isActive;
    this.role = role;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value,
      isActive: this.isActive.value,
      role: this.role.value,
      avatar: this.avatar.value,
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
      this.avatar,
      this.createdAt,
      UserUpdatedAt.now()
    );
  }

  resumeUpdatedAt(): User {
    return new User(
      this.id,
      this.email,
      this.password,
      this.isActive,
      this.role,
      this.avatar,
      this.createdAt,
      UserUpdatedAt.now()
    );
  }

  updateAvatar(avatar: UserAvatar): User {
    return new User(
      this.id,
      this.email,
      this.password,
      this.isActive,
      this.role,
      avatar,
      this.createdAt,
      UserUpdatedAt.now()
    );
  }

  removeAvatar(): User {
    return new User(
      this.id,
      this.email,
      this.password,
      this.isActive,
      this.role,
      new UserAvatar(),
      this.createdAt,
      UserUpdatedAt.now()
    );
  }
}
