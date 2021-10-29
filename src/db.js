const mongoose = require('mongoose');
const {database}= require('./keys');
mongoose.connect(database.URI).then(()=> console.log("MongoDB Conectado"))
.catch(()=> console.log("error:",err));