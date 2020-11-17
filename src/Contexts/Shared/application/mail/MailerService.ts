import { Message } from './Message';

export interface MailerService {
  sendMessage(message: Message): Promise<void>;
}
