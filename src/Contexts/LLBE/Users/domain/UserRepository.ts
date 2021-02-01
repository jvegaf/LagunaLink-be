import { Nullable } from '../../../Shared/domain/Nullable';
import { User } from './User';
import { UserId } from '../../Shared/domain/Users/UserId';
import { UserEmail } from './UserEmail';

export interface UserRepository {
  save(user: User): Promise<void>;

  search(id: UserId): Promise<Nullable<User>>;

  searchByEmail(email: UserEmail): Promise<Nullable<User>>;
}
