"use strict";

const mongoose = require("mongoose");
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db, (err, res) => {
    if (err) throw err;
    console.log('Database connection established');

    app.listen(config.port, () => {
      console.log(`API corriendo en el puerto ${config.port}`);
    });
});

