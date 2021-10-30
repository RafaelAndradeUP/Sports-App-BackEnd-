const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const PLSchema =new mongoose.Schema({
    postId: {
        type: ObjectId,
        ref: 'Post'
    },
    usuarioId: {
        type: ObjectId,
        ref: 'Usuario'
    }
},
{timestamps: true}
);

const PL = mongoose.model("PL", PLSchema, 'Interacciones');
module.exports= PL;