'use strict';

const express = require('express');
const api = express.Router();
const auth = require('../middlewares/auth');
const languageCtrl = require('../controllers/language');


/** Language */
api.get('/language', languageCtrl.getLanguages);
api.get('/language/:laguageId', languageCtrl.getLanguage);
api.post('/language', languageCtrl.saveLanguage);
api.delete('/language/:id', languageCtrl.deleteLanguage);
/** User */
// api.post('/user/sign_in')
/** Student */
api.post('/register/student', auth.isAuth, (req, res) => {
   res.status(200).send({ message: 'user loged' }); 
});
module.exports = api;