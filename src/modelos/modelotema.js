const mongoose = require("mongoose");

const topicSchema =new mongoose.Schema({
    tematica: {
        type: String, 
        required: true, 
        unique:true
    },
    nseguidores:{
        type: Number,
        default: 0
    }
}
);
const Tema = mongoose.model("Tema", topicSchema);
module.exports= Tema;
