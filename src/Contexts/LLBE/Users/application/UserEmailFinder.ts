import { UserRepository } from '../domain/UserRepository';
import { UserId } from '../../Shared/domain/Users/UserId';
import { UserEmail } from '../domain/UserEmail';
import { User } from '../domain/User';

export class UserEmailFinder {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(userId: UserId): Promise<UserEmail> {
    const user = (await this.repository.search(userId)) as User;
    return user.email;
  }
}
