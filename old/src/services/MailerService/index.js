"use strict";

const nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7cd6ff6222dcd8",
    pass: "faf26f6137e52d"
  }
});

async function sendConfirmationEmail(address, verificationToken) {
  
  let mailOps = {
    from: "noreply@lagunalink.edu",
    to: address,
    subject: "Account Confirmation",
    html: createConfirmationUrl(verificationToken),
  };

  let result = await transport.sendMail(mailOps);
  return result;
}

// TODO: MOVER ESTO FUERA Y QUE NOS LLEGUE LA URL
function createConfirmationUrl(token) {
  const link = '<a href="http://localhost:3000/api/v1/account/verify?token=' + token + '">Confirm your account</a>';
  //return '<!DOCTYPE html><html><head></head><body>' + link + '</body></>';
  return link;
}


module.exports = { sendConfirmationEmail };
