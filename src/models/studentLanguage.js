"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentLanguageSchema = new Schema({
  student: { type: Schema.ObjectId, ref: "Student" },
  language: { type: Schema.ObjectId, ref: "Language" },
  speak_level: { type: Number, min: 1, max: 5 },
  write_level: { type: Number, min: 1, max: 5 },
});

module.exports = mongoose.model("StudentLanguage", StudentLanguageSchema);
