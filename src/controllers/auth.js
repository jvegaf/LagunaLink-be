"use strict";

const mongoose = require('mongoose');
const User = require('../models/user');
const authService = require('../services/auth');
const encoder = require('../services/EncoderFactory');
const MailerService = getMailerService();


function getMailerService() {
    console.log('eligiendo mailer');
    if (process.env.NODE_ENV === 'test') {
        console.log('estamos en modo test');
        return require('../services/MockMailer');
    }
    return require('../services/MailerService');
}


async function signUp(req, res) {

    let result = await User.exists({ email: req.body.email });
    if(result) return res.status(403).send({ message: `The email address ${ req.body.email } has prevously registered`}); 
    

    const user = new User({
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
    });

    user.save()
        .then(() => {
            const response = MailerService.sendConfirmationEmail(user.email, authService.createEmailToken(user));
            console.log("respuesta: " + response);
            return res.status(200).send({ message: 'confirmation email sended' });
        })
        .catch(err => {
            console.log("save error:" + err.toString());
            //return res.status(500).send({ message: "user create error"});
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

