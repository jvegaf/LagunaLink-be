"use strict";

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Language = require("../models/language");

function getLanguage(req, res) {
  let languageId = req.params.languageId;

  Language.findById(languageId, (err, language) => {
    if (err) return res.status(500).send({ message: err });
    if (!language)
      return res.status(404).send({ message: "language not exist" });

    res.send(200, { language });
  });
}

function getLanguages(req, res) {
  Language.find({}, (err, languages) => {
    if (err) return res.status(500).send({ message: err });
    if (!languages)
      return res.status(404).send({ message: "don't exist languages" });

    res.send(200, { languages });
  });
}

function saveLanguage(req, res) {

    let language = new Language();
    language.name = req.body.name;

    language.save((err, languageStored) => {
        if (err) return res.status(500).send({ message: err });

        res.send(200, { language: languageStored });
    }) 

}

function deleteLanguage(req, res) {
    let languageId = req.params.languageId;

    Language.findById(languageId, (err, language) => {
        if (err) return res.status(500).send({ message: err });

        language.remove(err => {
            if (err) return res.status(500).send({ message: err });
            res.send(200, { message: 'language deleted' });
        })
    })
}

module.exports = { getLanguage, getLanguages, saveLanguage, deleteLanguage };
