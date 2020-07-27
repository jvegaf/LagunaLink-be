'use strict';


const bcrypt = require("bcrypt-nodejs");


function encode(password) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) console.log(err.message);

        bcrypt.hash(password, salt, null, (err, hash) => {
            if (err) console.log(err.message);
            return hash;
        });
    });
}

module.exports = { encode };