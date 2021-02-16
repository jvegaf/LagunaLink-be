import { MailerService } from '../../application/mail/MailerService';
import { Message } from '../../application/mail/Message';
import {UserRepository} from '../../../LLBE/Users/domain/UserRepository';
import {UserEmailConfirmator} from '../../../LLBE/Users/application/UserEmailConfirmator';
import {UserEmail} from '../../../LLBE/Users/domain/UserEmail';

export class MockMailer implements MailerService {
  private repo: UserRepository;
  private confirmator: UserEmailConfirmator;

  constructor(repo: UserRepository, confirmator: UserEmailConfirmator) {
    this.repo = repo;
    this.confirmator = confirmator;
  }

  async sendMessage(message: Message): Promise<void> {
    const user = await this.repo.searchByEmail(new UserEmail(message.to));
    if (user) {
      await this.confirmator.run(user.id);
    }
    return Promise.resolve(undefined);
  }

}
