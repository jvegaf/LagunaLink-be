import { UserEmail } from '../../../../../src/Contexts/LLBE/Users/domain/UserEmail';
import { EmailMother } from '../../../Shared/domain/EmailMother';

export class UserEmailMother {
  static create(value: string): UserEmail {
    return new UserEmail(value);
  }

  static random(): UserEmail {
    return this.create(EmailMother.random());
  }
}
