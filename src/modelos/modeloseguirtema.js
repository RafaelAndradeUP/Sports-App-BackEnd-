const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const STSchema =new mongoose.Schema({
    usuarioId:{
        type: ObjectId, 
        ref: 'Usuario',
        required: true, 
        unique:false
    },
    temaId: {
        type: ObjectId, 
        ref: 'Tema',
        required: true, 
        unique:false
    }
},
{timestamps: true}
);

const ST =mongoose.model("ST",STSchema,'Interacciones');
module.exports= ST;