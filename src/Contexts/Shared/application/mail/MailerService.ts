import { Message } from './Message';

export interface MailerService {
  sendAccountConfirmationMessage(message: Message): Promise<void>;
}
