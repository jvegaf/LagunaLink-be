import { ConfirmationEmail } from '../../../../../src/Contexts/LLBE/Users/domain/ConfirmationEmail';
import { User } from '../../../../../src/Contexts/LLBE/Users/domain/User';

export class UserConfirmationEmailMock implements ConfirmationEmail {
  sendTo(user: User): Promise<void> {
    return Promise.resolve(undefined);
  }
}
