import { UserRepository } from '../domain/UserRepository';
import { UserId } from '../../Shared/domain/Users/UserId';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { ApplicationService } from '../../../Shared/domain/ApplicationService';
import { RoleAccountCreator } from '../../Shared/application/Users/RoleAccountCreator';
import { User } from '../domain/User';

export class UserEmailConfirmator extends ApplicationService {
  private repository: UserRepository;
  private roleAccountCreator: RoleAccountCreator;

  constructor(repository: UserRepository, roleAccountCreator: RoleAccountCreator) {
    super();
    this.repository = repository;
    this.roleAccountCreator = roleAccountCreator;
  }

  async run(userId: UserId): Promise<void> {
    const user = await this.repository.search(userId);
    this.ensureExists(user);

    const userConfirmed = (user as User).activate();

    await this.repository.save(userConfirmed);

    await this.roleAccountCreator.run((user as User).id, (user as User).role);
  }

  private ensureExists(user: User | null) {
    if (user === null) {
      throw new InvalidArgumentError('user not exists');
    }
  }
}
