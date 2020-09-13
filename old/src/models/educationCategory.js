"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EducationCategorySchema = new Schema({
    name: String,
});

module.exports = mongoose.model('EducationCategory', EducationCategorySchema);