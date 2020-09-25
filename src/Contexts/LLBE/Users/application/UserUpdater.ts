import { UserRepository } from '../domain/UserRepository';
import { UpdateUserRequest } from './UpdateUserRequest';
import { User } from '../domain/User';
import { UserId } from '../../Shared/domain/Users/UserId';
import { UserEmail } from '../domain/UserEmail';
import { UserPassword } from '../domain/UserPassword';
import { UserIsActive } from '../domain/UserIsActive';
import { UserRole } from '../domain/UserRole';
import { UserCreatedAt } from '../domain/UserCreatedAt';
import { Timestamp } from '../../Shared/domain/Timestamp';
import { UserUpdatedAt } from '../domain/UserUpdatedAt';

export class UserUpdater {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(request: UpdateUserRequest): Promise<void> {
    const user = User.create(
      new UserId(request.id),
      new UserEmail(request.email),
      new UserPassword(request.password),
      new UserIsActive(request.isActive),
      new UserRole(request.role),
      new UserCreatedAt(request.createdAt),
      new UserUpdatedAt(Timestamp.now())
    );

    await this.repository.save(user);
  }

}
