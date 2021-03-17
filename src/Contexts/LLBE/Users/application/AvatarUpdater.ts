import { UserRepository } from '../domain/UserRepository';
import { UpdateAvatarRequest } from './UpdateAvatarRequest';
import { UserId } from '../../Shared/domain/Users/UserId';
import { ApplicationService } from '../../../Shared/domain/ApplicationService';
import { UserAvatarRepository } from '../domain/UserAvatarRepository';

export class AvatarUpdater extends ApplicationService {
  private repository: UserAvatarRepository;

  constructor(avatarRepository: UserAvatarRepository) {
    super();
    this.repository = avatarRepository;
  }

  async run(request: UpdateAvatarRequest) {}
}
