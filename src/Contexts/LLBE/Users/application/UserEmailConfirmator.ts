import { UserRepository } from '../domain/UserRepository';
import { UserId } from '../../Shared/domain/Users/UserId';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { ApplicationService } from '../../../Shared/domain/ApplicationService';

export class UserEmailConfirmator extends ApplicationService{
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    super();
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
