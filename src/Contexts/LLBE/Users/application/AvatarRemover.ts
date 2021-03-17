import { ApplicationService } from '../../../Shared/domain/ApplicationService';
import { UserId } from '../../Shared/domain/Users/UserId';
import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import path from 'path';
import fs from 'fs-extra';

export class AvatarRemover extends ApplicationService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    super();
    this.repository = repository;
  }

  public async run(userId: UserId): Promise<void> {
    const user = (await this.repository.search(userId)) as User;
    const avatarPath = user.avatar.value;
    if (avatarPath === '') {
      return this.logInfo(`not have avatar of ${user.email}`);
    }
    await fs.unlink(path.resolve(avatarPath))
    await this.repository.save(user.removeAvatar());
    this.logInfo(`deleted avatar of user ${user.email}`);
  }
}
