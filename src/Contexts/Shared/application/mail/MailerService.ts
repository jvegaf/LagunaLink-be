import { Message } from "./Message";

export interface MailerService {
  send(message: Message): Promise<void>;
}
