"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobOpeningLanguageRequiredSchema = new Schema({
  job_opening: { type: Schema.ObjectId, ref: "JobOpening" },
  language: { type: Schema.ObjectId, ref: "Language" },
  speak_level_required: { type: Number, min: 1, max: 5 },
  write_level_required: { type: Number, min: 1, max: 5 },
});

module.exports = mongoose.model(
  "JobOpeningLanguageRequired",
  JobOpeningLanguageRequiredSchema
);
