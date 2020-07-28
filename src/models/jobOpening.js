"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LanguageRequiredSchema = new Schema({
  language: { type: Schema.ObjectId, ref: "Language" },
  speak_level_required: { type: Number, min: 1, max: 5 },
  write_level_required: { type: Number, min: 1, max: 5 },
});

const JobOpeningSchema = new Schema({
  company: { type: Schema.ObjectId, ref: "Company" },
  qualifitacion_required: { type: Schema.ObjectId, ref: "AcademicTitle" },
  languages_required: [LanguageRequiredSchema],
  position: String,
  responsibilities: String,
  previous_experience: String,
  conditions: String,
});

module.exports = mongoose.model("JobOpening", JobOpeningSchema);
