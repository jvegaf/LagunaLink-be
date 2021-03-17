import { UserRepository } from '../domain/UserRepository';
import { UpdateAvatarRequest } from './UpdateAvatarRequest';
import { UserId } from '../../Shared/domain/Users/UserId';
import { ApplicationService } from '../../../Shared/domain/ApplicationService';
import { UserAvatar } from '../domain/UserAvatar';
import { User } from '../domain/User';

export class AvatarUpdater extends ApplicationService {
  private repository: UserRepository;

  constructor(userRepository: UserRepository) {
    super();
    this.repository = userRepository;
  }

  async run(request: UpdateAvatarRequest): Promise<void> {
    const user = (await this.repository.search(new UserId(request.userId))) as User;
    await this.repository.save(user.updateAvatar(new UserAvatar(request.path)));
    this.logInfo(`updated avatar of ${user.email}`);
  }
}
