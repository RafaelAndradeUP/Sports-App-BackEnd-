const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema =new mongoose.Schema({
        tema: {
            type: String,
            required: true
        },
        temaId:{
            type: ObjectId, 
            ref: 'Tema',
            required: false, 
            unique:false
        },
        texto: {
            type: String,
            required: true
        },
        nlikes: {
            type: Number,
            default: 0
        },
        usuarioId: {
            type: ObjectId,
            ref: 'Usuario'
        },
        imagen: {
            data: Buffer,
            contentType: String,
        },
    },
    {timestamps: true}
);

const Post = mongoose.model("Post",postSchema);
module.exports= Post;