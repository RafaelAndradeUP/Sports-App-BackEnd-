const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const SUSchema =new mongoose.Schema({
    seguidor: {
        type: ObjectId, 
        ref: 'Usuario',
        required: true, 
        unique:false
    },
    Seguido: {
        type: ObjectId, 
        ref: 'Usuario',
        required: true, 
        unique:false
    }
},
{timestamps: true}
);

const SU = mongoose.model("SU", SUSchema, 'Interacciones');
module.exports= SU;