"use strict";

const mongoose = require('mongoose');
const User = require('../models/user');
const authService = require('../services/auth');
const encoder = require('../services/EncoderFactory');
const MailerService = require('../services/MailerService');
const nodemailer = require('nodemailer-mock');
/** TODO: cambiar esto cuanto antes */
// const transpOps = {
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "7cd6ff6222dcd8",
//       pass: "faf26f6137e52d"
//     }
// };
const transpOps = {};



const mailer = new MailerService(nodemailer, transpOps);

function signUp(req, res) {

    User.exists({ email: req.body.email })
    .then(result => {
        if(result) return res.status(403).send({ message: `The email address ${ req.body.email } has prevously registered`}); 
    })

    const user = new User({
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
    });

    user.save()
        .then(() => {
            return mailer.sendConfirmationEmail(user.email, authService.createEmailToken(user));
        })
        .then((response) => {
            console.log('respuesta: ' + response);
            return res.status(200).send({ message: 'confirmation email sended' });

        })
        .catch(err => {
            return res.status(500).send({ message: `user create error: ${err.message}` });
        });
}

function signIn(req, res) { 
    const encodedPaswd = encoder.encode(req.body.password);
    User.findOne({email: req.body.email, password: encodedPaswd})
    .then((user) => {
        return res.status(200).send({ access_token: authService.createAccessToken(user) });
    }).catch((err) => {
        return res.status(404).send({ message: `user or password wrong` });
    });
}

function verifyEmail(req, res) {
    
}

module.exports = {
    signUp,
    signIn,
    verifyEmail
};

