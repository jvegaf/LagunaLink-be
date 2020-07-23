'use strict';


const express = require("express");

const bodyParser = require("body-parser");
const languageCtrl = require('./controllers/language');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/language", languageCtrl.getLanguages);
app.get("/api/language/:laguageId", languageCtrl.getLanguage);
app.post("/api/language", languageCtrl.saveLanguage);
app.delete("/api/language/:id", languageCtrl.deleteLanguage);


module.exports = app;