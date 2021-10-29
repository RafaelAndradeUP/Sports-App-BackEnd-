const mongoose = require("mongoose");

const SUSchema =new mongoose.Schema({
    id: {type: String, required: true, unique:true},
    Seguidor: {type: String, required: true, unique:false},
    Seguido: {type: String, required: true, unique:false}
});

const SU = mongoose.model("SU",SUSchema);
module.exports= SU;