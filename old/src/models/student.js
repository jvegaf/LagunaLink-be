"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const QualificationSchema = new Schema({
  academic_title: { type: Schema.ObjectId, ref: "AcademicTitle" },
  start_date: Date,
  end_date: Date,
});

const LangSchema = new Schema({
  language: { type: Schema.ObjectId, ref: "Language" },
  speak_level: { type: Number, min: 1, max: 5 },
  write_level: { type: Number, min: 1, max: 5 },
});

const JobExperienceSchema = new Schema({
  company: String,
  position: String,
  responsibilities: String,
  start_date: Date,
  end_date: Date,
});

/** TODO: meter un schema de red social con nombre de red y profile_url */

const StudentSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  name: String,
  surname_first: String,
  surname_last: String,
  academic_titles: [QualificationSchema],
  job_experiences: [JobExperienceSchema],
  languages: [LangSchema],
});


module.exports = mongoose.model('Student', StudentSchema);