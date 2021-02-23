import { UserId } from '../../Shared/domain/Users/UserId';

export interface LastUpdateResumer {

  run(userId: UserId): Promise<void>;
}
