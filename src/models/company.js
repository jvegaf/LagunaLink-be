"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    name: String,
    web_address: String,
    location: { type: Schema.ObjectId, ref: 'City' },
    description: String,
});

module.exports = mongoose.model('Company', CompanySchema);