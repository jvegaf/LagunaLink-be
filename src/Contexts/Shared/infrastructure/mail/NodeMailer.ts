import { MailerService } from '../../application/mail/MailerService';
import nodemailer, { Transporter } from 'nodemailer';
import { Message } from '../../application/mail/Message';

export class NodeMailer implements MailerService {
  private readonly HOST = 'smtp.mailtrap.io';
  private readonly PORT = 2525;
  private readonly AUTH_USER = '7cd6ff6222dcd8';
  private readonly AUTH_PASS = 'faf26f6137e52d';

  private readonly transport: Transporter;

  constructor() {
    this.transport = nodemailer.createTransport({
      host: this.HOST,
      port: this.PORT,
      auth: {
        user: this.AUTH_USER,
        pass: this.AUTH_PASS,
      },
    });
  }

  async sendAccountConfirmationMessage(message: Message): Promise<void> {
    await this.transport.sendMail(message.toJSON());
    return Promise.resolve(undefined);
  }
}
