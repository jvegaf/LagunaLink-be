import { UserUpdateRegistered } from '../../../../../src/Contexts/LLBE/Users/application/UserUpdateRegistered';
import { UserId } from '../../../../../src/Contexts/LLBE/Shared/domain/Users/UserId';

export class UserUpdateRegisteredMock extends UserUpdateRegistered {
  async run(userId: UserId): Promise<void> {
    return;
  }
}
