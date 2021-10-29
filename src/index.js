const express= require('express');

const config = require('./servidor/config');

require('./db');
const app=config(express());

app.listen(app.get('port'), () => {
    console.log("Servidor corriendo en ",app.get('port'));
  });