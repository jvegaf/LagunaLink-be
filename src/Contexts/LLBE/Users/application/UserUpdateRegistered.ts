import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { UserId } from '../../Shared/domain/Users/UserId';

export class UserUpdateRegistered {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(userId: UserId): Promise<void> {

    const user: User = await this.repository.search(userId) as User;

    await this.repository.save(user.register());

  }
}
