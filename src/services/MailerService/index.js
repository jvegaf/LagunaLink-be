"use strict";

class MailerService {
  constructor(mailerModule, transporterOps) {
    this.nodemailer = mailerModule;
    this.transporter = this.nodemailer.createTransport({
      host: transporterOps.host,
      port: transporterOps.port,
      auth: transporterOps.auth
    });
  }

  async sendConfirmationEmail(address, verificationToken) {
    let mailOps = {
      from: "noreply@lagunalink.edu",
      to: address,
      subject: "Account Confirmation",
      text: this.createConfirmationUrl(verificationToken),
    };

    this.transporter.sendMail(mailOps, function (err, info) {
      //TODO: cambiar por un throw
      if (err) return err.message;
      return info.response;
    });
  }

  // TODO: MOVER ESTO FUERA Y QUE NOS LLEGUE LA URL
  createConfirmationUrl(token) {
    const link = '<a href="http://localhost:3000/api/v1/account/verify?token=' + token + '">Confirm your account</a>';
    return '<!DOCTYPE html><html><head></head><body>' + link + '</body></>';
  }

}

module.exports = MailerService;
