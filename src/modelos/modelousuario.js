const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    nombre_usuario: {
        type: String, 
        required: true, 
        unique:true
    },
    contrasena: {
        type: String, 
        required: true, 
        unique:false
    },
    correo: {
        type: String, 
        required: true, 
        unique:true
    }
},
{timestamps: true}
);

const Usuario = mongoose.model("Usuario",userSchema);
module.exports= Usuario;