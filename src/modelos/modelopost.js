const mongoose = require("mongoose");

const postSchema =new mongoose.Schema({
    id: {type: String, required: true, unique:true},
    usuario: {type: String, required: true, unique:false},
    texto: String,
    nlikes: Number,
    fecha: Date
});

const Post = mongoose.model("Post",postSchema);
module.exports= Post;