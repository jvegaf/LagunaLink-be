"use strict";

const mongoose = require("mongoose");
const app = require('./app');

const port = 3001;

mongoose.connect('mongodb://localhost:27017/lagunalink_db', (err, res) => {
    if (err) throw err;
    console.log('Database connection established');

    app.listen(port, () => {
      console.log(`API corriendo en el puerto ${port}`);
    });
});

