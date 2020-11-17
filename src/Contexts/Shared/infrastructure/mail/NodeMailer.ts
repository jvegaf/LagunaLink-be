import { MailerService } from '../../application/mail/MailerService';
import nodemailer, { Transporter } from 'nodemailer';
import { Message } from '../../application/mail/Message';
import path from 'path';

const hbs = require('nodemailer-express-handlebars');

export class NodeMailer implements MailerService {

  private transport: Transporter;

  private HOST: string;
  private PORT: number;
  private USER: string;
  private PASS: string;

  constructor() {

    const viewsPath = path.resolve(process.cwd(), 'src/app/lagunalink_be/views');

    const options = {
      viewEngine : {
        extname: '.hbs', // handlebars extension
        layoutsDir: viewsPath,
        defaultLayout: 'confirm', // name of main template
        partialsDir: viewsPath, // location of your subtemplates aka. header, footer etc
      },
      viewPath: viewsPath,
      extName: '.hbs'
    };

    this.HOST = process.env.MAILER_HOST!;
    this.PORT = Number(process.env.MAILER_PORT!);
    this.USER = process.env.MAILER_AUTH_USER!;
    this.PASS = process.env.MAILER_AUTH_PASS!;
    this.transport = nodemailer.createTransport({
      host: this.HOST,
      port: this.PORT,
      auth: {
        user: this.USER,
        pass: this.PASS,
      },
    });
    this.transport.use('compile', hbs(options));
  }

  async sendMessage(message: Message): Promise<void> {
    await this.transport.sendMail(message.toJSON());
    return Promise.resolve(undefined);
  }
}
