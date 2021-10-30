const mongoose = require("mongoose");

const postSchema =new mongoose.Schema({
        usuario: {
            type: String, 
            required: true, 
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
    },
    {timestamps: true}
);

const Post = mongoose.model("Post",postSchema);
module.exports= Post;