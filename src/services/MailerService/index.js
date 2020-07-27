"use strict";

class MailerService {
  constructor(mailerModule, transporterOps) {
    this.nodemailer = mailerModule;
    this.transporter = this.nodemailer.createTransport({
      host: transporterOps.host,
      port: transporterOps.port,
      secure: transporterOps.secure,
    });
  }

  async sendConfirmationEmail(address, verificationToken) {
    let mailOps = {
      from: "noreply@lagunalink.edu",
      to: address,
      subject: "Account Confirmation",
      text: verificationToken,
    };

    this.transporter.sendMail(mailOps, function (err, info) {
      //TODO: cambiar por un throw
      if (err) return err.message;
      return info.response;
    });
  }
}

module.exports = MailerService;
