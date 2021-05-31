import { ApplicationService } from '../../../Shared/domain/ApplicationService';
import { UserId } from '../../Shared/domain/Users/UserId';
import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { UserAvatar } from '../domain/UserAvatar';

export class AvatarFinder extends ApplicationService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    super();
    this.repository = repository;
  }

  public async run(userId: UserId): Promise<UserAvatar> {
    const user = (await this.repository.search(userId)) as User;
    this.logInfo(`founded avatar of user ${user.email}`);
    return user.avatar;
  }
}
