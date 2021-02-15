import { MailerService } from '../../application/mail/MailerService';
import { Message } from '../../application/mail/Message';

export class MockMailer implements MailerService {

  sendMessage(message: Message): Promise<void> {
    return Promise.resolve(undefined);
  }

}
