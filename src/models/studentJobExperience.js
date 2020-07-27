"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentJobExperienceSchema = new Schema({
  student: { type: Schema.ObjectId, ref: "Student" },
  company: String,
  position: String,
  responsibilities: String,
  start_date: Date,
  end_date: Date,
});

module.exports = mongoose.model(
  "StudentJobExperience",
  StudentJobExperienceSchema
);
