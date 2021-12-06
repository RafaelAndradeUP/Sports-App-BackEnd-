const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const STSchema =new mongoose.Schema({
    followerId:{
        type: ObjectId, 
        ref: 'Usuario',
        required: true, 
        unique:false
    },
    equipoId: {
        type: String,
        required: true, 
    },
    imagenEquipo: {
        type: String,
        required: true, 
    }
},
{timestamps: true}
);

const ST =mongoose.model("ST",STSchema,'Interacciones');
module.exports= ST;