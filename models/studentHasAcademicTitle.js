"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentHasAcademicTitleSchema = new Schema({
  student: { type: Schema.ObjectId, ref: "Student" },
  academic_title: { type: Schema.ObjectId, ref: "AcademicTitle" },
  start_date: Date,
  end_date: Date,
});

module.exports = mongoose.model(
  "StudentHasAcademicTitle",
  StudentHasAcademicTitleSchema
);
