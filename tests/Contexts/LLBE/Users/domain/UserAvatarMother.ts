import { UserAvatar } from '../../../../../src/Contexts/LLBE/Users/domain/UserAvatar';
import { PathMother } from '../../../Shared/domain/PathMother';

export class UserAvatarMother {
  static create(value?: string): UserAvatar {
    return new UserAvatar(value || '');
  }

  static random(): UserAvatar {
    return this.create(PathMother.random());
  }
}
