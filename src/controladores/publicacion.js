const PL = require('../modelos/modelopost_like');
const SU = require('../modelos/modusuario_seguidor');
const Post = require('../modelos/modelopost');
const Usuario = require('../modelos/modelousuario');


const control={};


control.crear= async(req,res)=>{
    const Aux=new Post({ususario:String(req.body.usuario),texto:String(req.body.texto),nlikes:0,usuarioId:req.body.usuarioId});
    try{
        Aux.save();
        res.status(200).json(Aux);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
    
};
control.like=(req,res)=>{
    const Aux=new PL({postId:req.body.postId, usuarioID:req.params});
    try{
        Aux.save();
        Post.updateOne({id:req.body.postId},{$inc:{nlikes:1}}).then((data)=>{console.log("Likeado")}).catch((err)=>console.log("Algo salio mal al opinar:",err));
        res.status(200).json(Aux);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
    
    
};
control.eliminar=(req,res)=>{
    try{
        Post.deleteOne({id:req.params}).then((data)=>{console.log("Eliminado")}).catch((err)=>console.log("Algo salio mal al borrar:",err));
        res.status(200).json()
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
    
};

module.exports=control;