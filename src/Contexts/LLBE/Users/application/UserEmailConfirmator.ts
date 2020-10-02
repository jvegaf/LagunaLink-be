import { UserRepository } from '../domain/UserRepository';
import { UserId } from '../../Shared/domain/Users/UserId';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export class UserEmailConfirmator {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(userId: UserId): Promise<void> {
    const user = await this.repository.search(userId);
    if (user === null) {
      throw new InvalidArgumentError();
    }
    const userConfirmed = user.activate();
    await this.repository.save(userConfirmed);
  }
}
