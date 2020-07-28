'use strict';
const { validationResult } = require('express-validator');


function valAccountRegister(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        res.end();
    }


    const roles = ["ROLE_STUDENT", "ROLE_COMPANY", "ROLE_ADMIN"];

    if (req.body.email === undefined ||
        req.body.password === undefined ||
        req.body.role === undefined) {
        res.status(403).send({ message: 'request parameters incomplete' });
        res.end();
    }

    var result = false;

    roles.forEach(role => {
        if (req.body.role === role) result=true;
    });

    if(!result){
        res.status(403).send({ message: 'request role not exist' });
        res.end();
    }

    next();
}

module.exports = { valAccountRegister };