import { Nullable } from '../../../Shared/domain/Nullable';
import { UserAvatar } from './UserAvatar';

export interface UserAvatarRepository {
  save(image: any): Promise<void>;

  find(avatar: UserAvatar): Promise<Nullable<any>>;

  delete(avatar: UserAvatar): Promise<void>;
}
