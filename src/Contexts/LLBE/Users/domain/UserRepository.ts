import { Nullable } from '../../../Shared/domain/Nullable';
import { User } from './User';
import { UserId } from "../../Shared/domain/Users/UserId";

export interface UserRepository {
  save(user:  User): Promise<void>;

  search(id: UserId): Promise<Nullable<User>>;
}
