"use strict";

const jwt = require("jwt-simple");
const moment = require('moment');
const config = require('../../../config');

function createToken(user) {
  const payload = {
    sub: user._id,
    role: user.role,
    iat: moment().unix(), // when token was created
    exp: moment().add(14, "days").unix() // expiration
  };

  return jwt.encode(payload, config.secret);
}

module.exports = { createToken };
