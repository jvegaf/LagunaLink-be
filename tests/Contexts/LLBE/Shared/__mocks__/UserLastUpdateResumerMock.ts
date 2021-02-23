import { LastUpdateResumer } from '../../../../../src/Contexts/LLBE/Users/application/LastUpdateResumer';
import { UserId } from '../../../../../src/Contexts/LLBE/Shared/domain/Users/UserId';

export class UserLastUpdateResumerMock implements LastUpdateResumer {

  run(userId: UserId): Promise<void> {
    return Promise.resolve(undefined);
  }

}
