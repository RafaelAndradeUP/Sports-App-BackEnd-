const mongoose = require("mongoose");

const PLSchema =new mongoose.Schema({
    id: {type: String, required: true, unique:true},
    post: String,
    usuario: String
});

const PL = mongoose.model("PL",PLSchema);
module.exports= PL;