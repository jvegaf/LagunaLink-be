"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: String,
  province: { type: Schema.ObjectId, ref: "Province" },
});

module.exports = mongoose.model("City", CitySchema);
