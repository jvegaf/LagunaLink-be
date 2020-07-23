"use strict";

const express = require("express");
const api = express.Router();
const languageCtrl = require('../controllers/language');

api.get("/language", languageCtrl.getLanguages);
api.get("/language/:laguageId", languageCtrl.getLanguage);
api.post("/language", languageCtrl.saveLanguage);
api.delete("/language/:id", languageCtrl.deleteLanguage);

module.exports = api;