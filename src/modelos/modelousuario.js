const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    nombre_usuario: {
        type: String, 
        required: true, 
        unique:true
    },
    password: {
        type: String, 
        required: true, 
        unique:false
    },
    email: {
        type: String, 
        required: true, 
        unique:true
    },
    imagen: {
        data: Buffer,
        contentType: String,
    },
    nseguidores: {
        type: Number,
        default: 0
    },
},
{timestamps: true}
);

const Usuario = mongoose.model("Usuario",userSchema);
module.exports= Usuario;