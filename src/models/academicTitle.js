"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AcademicTitleSchema = new Schema({
  name: String,
  category: { type: Schema.ObjectId, ref: "EducationCategory" },
});

module.exports = mongoose.model("AcademicTitle", AcademicTitleSchema);
