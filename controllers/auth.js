"use strict";

const mogoose = require("mogoose");
const User = require("../models/user");
const auth = require('../services/auth')

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        role: req.body.role,
    });
    user.save((err) => {
        if (err) res.status(500).send({ message: err });
        return res.status(200).send({ token: auth.createToken(user) });
    } )
}

function signIn(req, res) {}

module.exports = {
  signUp,
  signIn,
};
