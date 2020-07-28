"use strict";

const { stubTransport } = require('nodemailer-stub'); 
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport(stubTransport);

function sendConfirmationEmail(address, verificationToken) {
  return verificationToken;
}

// TODO: MOVER ESTO FUERA Y QUE NOS LLEGUE LA URL
function createConfirmationUrl(token) {
  const link = '<a href="http://localhost:3000/api/v1/account/verify?token=' + token + '">Confirm your account</a>';
  //return '<!DOCTYPE html><html><head></head><body>' + link + '</body></>';
  return link;
}


module.exports = { sendConfirmationEmail };
