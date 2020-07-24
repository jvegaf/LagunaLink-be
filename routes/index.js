'use strict';

const express = require('express');
const api = express.Router();
const auth = require('../middlewares/auth');
const languageCtrl = require('../controllers/language');
const authCtrl = require('../controllers/auth');


/** Language */
api.get('/language', languageCtrl.getLanguages);
api.get('/language/:laguageId', languageCtrl.getLanguage);
api.post('/language', languageCtrl.saveLanguage);
api.delete('/language/:id', languageCtrl.deleteLanguage);
/** User */
api.post('/user/sign_in', authCtrl.signIn);
api.post('/register/user', authCtrl.signUp);
/** Student */
api.post('/register/student', auth.isAuth, (req, res) => {
   res.status(200).send({ message: 'user loged' }); 
});
module.exports = api;