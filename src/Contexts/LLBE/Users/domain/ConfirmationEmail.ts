import { User } from './User';

export interface ConfirmationEmail {
  sendTo(user: User): Promise<void>;
}
