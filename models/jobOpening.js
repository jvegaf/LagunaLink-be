"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobOpeningSchema = new Schema({
  company: { type: Schema.ObjectId, ref: "Company" },
  qualifitacion_required: { type: Schema.ObjectId, ref: "AcademicTitle" },
  position: String,
  responsibilities: String,
  previous_experience: String,
  conditions: String,
});

module.exports = mongoose.model("JobOpening", JobOpeningSchema);
