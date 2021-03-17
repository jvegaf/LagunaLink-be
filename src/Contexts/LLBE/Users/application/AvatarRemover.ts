import { ApplicationService } from '../../../Shared/domain/ApplicationService';
import { UserId } from '../../Shared/domain/Users/UserId';

export class AvatarRemover extends ApplicationService {
  constructor() {
    super();
  }

  public async run(userId: UserId) {}
}
