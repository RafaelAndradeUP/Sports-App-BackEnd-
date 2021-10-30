const PL = require('../modelos/modelopost_like');
const SU = require('../modelos/modusuario_seguidor');
const Post = require('../modelos/modelopost');
const Usuario = require('../modelos/modelousuario');


const control={};


control.crear=(req,res)=>{
    let Aux=new Post({ususario:String(req.body.usuario),texto:String(req.body.texto),nlikes:0});
    Aux.save();
    res.send(Aux.json());
};
control.like=(req,res)=>{
    let Aux=new PL({postId:req.body.postId, usuarioID:req.body.usuarioID});
    Aux.save();
    Post.updateOne({id:req.body.postId},{$inc:{nlikes:1}}).then((data)=>{console.log("Likeado")}).catch((err)=>console.log("Algo salio mal al opinar:",err));
    res.send('Gracias, tu opinion es importante');
};
control.eliminar=(req,res)=>{
    Post.deleteOne({id:req.body.postId}).then((data)=>{console.log("Eliminado")}).catch((err)=>console.log("Algo salio mal al borrar:",err));
    res.send('Post eliminado')
};

module.exports=control;