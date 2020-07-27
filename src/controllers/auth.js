"use strict";

const mongoose = require('mongoose');
const User = require('../models/user');
const authService = require('../services/auth');
const encoder = require('../services/EncoderFactory');

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
            return res.status(200).send({ access_token: authService.createToken(user) });
        }).catch(err => {
            return res.status(500).send({ message: `user create error: ${err.message}` });
        });
}

function signIn(req, res) { 
    const encodedPaswd = encoder.encode(req.body.password);
    User.findOne({email: req.body.email, password: encodedPaswd})
    .then((user) => {
        return res.status(200).send({ access_token: authService.createToken(user) });
    }).catch((err) => {
        return res.status(404).send({ message: `user or password wrong` });
    });
}

module.exports = {
    signUp,
    signIn,
};

