import { MailerService } from '../../../Shared/application/mail/MailerService';
import { TokenGenerator } from '../domain/TokenGenerator';
import { User } from '../domain/User';
import { Payload } from '../domain/Payload';
import { Token } from '../domain/Token';
import { Message } from '../../../Shared/application/mail/Message';
import { ConfirmationEmail } from '../domain/ConfirmationEmail';

export class UserConfirmationEmailDealer implements ConfirmationEmail {
  private readonly mailer: MailerService;
  private readonly tokenGenerator: TokenGenerator;

  constructor(mailer: MailerService, generator: TokenGenerator) {
    this.mailer = mailer;
    this.tokenGenerator = generator;
  }

  async sendTo(user: User): Promise<void> {
    const payload: Payload = {
      userId: user.id.value,
      role: user.role.value,
    };
    const token = this.tokenGenerator.run(payload);
    const uri = this.getUri(token);
    const message = new Message(
      'noreply@lagunalink.edu',
      user.email.value,
      'LagunaLink Account Confirmation',
      'confirm',
      uri
    );
    await this.mailer.sendMessage(message);
  }

  private getUri(token: Token) {
    const baseUrl: string = process.env.BASE_URL!;
    const parameter = 'token=' + token.value;
    return `http://${baseUrl}/auth/email_verification?${parameter}`;
  }
}
