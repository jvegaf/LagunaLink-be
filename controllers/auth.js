"use strict";

const mongoose = require('mongoose');
const User = require('../models/user');
const authService = require('../services/auth');

function signUp(req, res) {
    console.log(req.body);
    const user = new User({
        email: req.body.email,
        role: req.body.role,
    });
    user.save((err) => {
        if (err) res.status(500).send({ message: err.message });
        return res.status(200).send({ token: authService.createToken(user) });
    })
}

function signIn(req, res) { }

module.exports = {
    signUp,
    signIn,
};
