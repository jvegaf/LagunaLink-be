"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const encoder = require('../services/EncoderFactory')

const UserSchema = Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  role: { type: String, enum: ["ROLE_STUDENT", "ROLE_COMPANY"] },
});

UserSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();

  user.password = encoder.encode(user.password);  
  next();
});


module.exports = mongoose.model("User", UserSchema);
