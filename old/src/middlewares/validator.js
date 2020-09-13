'use strict';
const { validationResult } = require('express-validator');


function valAccountRegister(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });


    const roles = ["ROLE_STUDENT", "ROLE_COMPANY", "ROLE_ADMIN"];

    if (req.body.email === undefined ||
        req.body.password === undefined ||
        req.body.role === undefined)
        return res.status(403).send({ message: 'request parameters incomplete' });


    var result = false;

    roles.forEach(role => {
        if (req.body.role === role) result = true;
    });

    if (!result) return res.status(403).send({ message: 'request role not exist' });

    next();
}

module.exports = { valAccountRegister };