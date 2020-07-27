"use strict";

const mongoose = require('mongoose');
const User = require('../models/user');
const authService = require('../services/auth');

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
            return res.status(200).send({ token: authService.createToken(user) });
        }).catch(err => {
            if (err) return res.status(500).send({ message: `user save error: ${err.message}` });
        });
}

function signIn(req, res) { }

module.exports = {
    signUp,
    signIn,
};
