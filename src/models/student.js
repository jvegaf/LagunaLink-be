"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  surname_first: String,
  surname_last: String,
  user: { type: Schema.ObjectId, ref: "User" },
});


module.exports = mongoose.model('Student', StudentSchema);