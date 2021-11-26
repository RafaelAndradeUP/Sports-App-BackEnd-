const PL = require('../modelos/modelopost_like');
const SU = require('../modelos/modusuario_seguidor');
const Post = require('../modelos/modelopost');
const Usuario = require('../modelos/modelousuario');
const fs = require('fs');


const control={};


control.crear= async(req,res)=>{

    try{
        const fields = req.fields;
        const files = req.files;

        const post = new Post(fields);

        if (files.imagen) {
            post.imagen.data = fs.readFileSync(files.imagen.path);
            post.imagen.contentType = files.imagen.type;
        }

        post.save((err, result) => {
            if (err) {
              console.log("Error al guardar => ", err);
              res.status(400).send("Error al guardar");
            }
            res.json(result);
        });
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
    
};

control.imagen = async (req, res) => {
    let post = await Post.findById(req.params.postId).exec();
    if (post && post.imagen && post.imagen.data !== null) {
      res.set("Content-Type", post.imagen.contentType);
      return res.send(post.imagen.data);
    }
  };

control.posts= async(req,res)=>{
    try{
        const posts = await Post.find({})
        .populate('usuarioId')
        .sort({createdAt: -1})
        .exec();
        res.status(200).send(posts);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
    
};


control.pls= async(req,res)=>{
    try{
        const pls = await PL.find({usuarioId: req.params.userId})
        .sort({createdAt: -1})
        .exec();
        res.status(200).send(pls);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
    
};

control.like = async (req,res)=>{
    try{
        let like = new PL(req.fields);
        await like.save();
        await Post.findByIdAndUpdate(like.postId,{$inc:{nlikes:1}}).then((data)=>{console.log("Likeado")}).catch((err)=>console.log("Algo salio mal al opinar:",err));
        res.status(200).json(like);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
    
    
};

control.dislike = async (req,res)=>{
    try{
        console.log(req.body);
        const { docId, postId } = req.body; 
        await PL.findByIdAndRemove(docId);
        await Post.findByIdAndUpdate(postId,{$inc:{nlikes: -1}}).then((data)=>{console.log("Dislikeado")}).catch((err)=>console.log("Algo salio mal al opinar:",err));
        res.status(200).send({
            ok: true
        });
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
    
    
};

control.eliminar = async (req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json()
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
    
};

module.exports=control;