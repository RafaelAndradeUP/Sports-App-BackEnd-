const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    id: {type: String, required: true, unique:true},
    nombre_usuario: {type: String, required: true, unique:true},
    contrasena: {type: String, required: true, unique:false},
    correo: {type: String, required: true, unique:true}
});

const Usuario = mongoose.model("Usuario",userSchema);
module.exports= Usuario;