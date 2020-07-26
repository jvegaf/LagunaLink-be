"use strict";

const mongoose = require("mongoose");
const app = require('./app');
const config = require('./config');

// Le indicamos a Mongoose que haremos la conexión con Promesas
mongoose.Promise = global.Promise;

mongoose.connect(config.db,  { useNewUrlParser: true })
.then(() => {
  
  console.log('Database connection established');
  
  app.listen(config.port, () => {
    console.log(`API corriendo en el puerto ${config.port}`);
  });
}).catch(err => console.log(err));

