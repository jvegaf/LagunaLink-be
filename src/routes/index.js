'use strict';

const express = require('express');
const api = express.Router();
const languageCtrl = require('../controllers/language');
const authCtrl = require('../controllers/auth');
const validator = require('../middlewares/validator');
const { body } = require('express-validator');


/** User */
//api.post('/account/sign_in', authCtrl.signIn);
api.post('/account/register', [body('email').isEmail(), body('password').isLength({ min: 5 })], validator.valAccountRegister, authCtrl.signUp);
api.post('/account/register', authCtrl.signUp);
api.post('/account/verify', authCtrl.verifyEmail);
/** Language */
api.get('/language', languageCtrl.getLanguages);
api.get('/language/:laguageId', languageCtrl.getLanguage);
api.post('/language', languageCtrl.saveLanguage);
api.delete('/language/:id', languageCtrl.deleteLanguage);
/** Education Category */
//api.get('/education/category',);
/** Student */
// api.post('/register/student', auth.isAuth, (req, res) => {
//    res.status(200).send({ message: 'user loged' }); 
// });
// api.get('/student/:userId')




module.exports = api;