const PL = require('../modelos/modelopost_like');
const SU = require('../modelos/modusuario_seguidor');
const Post = require('../modelos/modelopost');
const Usuario = require('../modelos/modelousuario');

const control={};

control.inicio=(req,res)=>{
    Post.find({},function(err,posts){
        res.send({
          postsList:posts
        });
    });
    console.log('Pagina de inicio');
};
control.chargeuser=(req,res)=>{
    console.log("Accediendo a los posts de un usuario");
    
    Post.find({usuario:req.body.usuario},function(err,posts){
        res.send({
          postsList:posts
        });
    });
};

control.iniciosesion=(req,res)=>{
    console.log("Accediendo a tu cuenta");
    
};
control.registro=(req,res)=>{
    console.log("Creando una cuenta");
    res.send('Pagina de inicio');
};
control.lostpassword=(req,res)=>{
    console.log("Recuperando contraseña");
    res.send('Pagina de inicio');
};

control.modificarperfil=(req,res)=>{
    console.log("Modificando una cuenta");
    Usuario.updateOne({nombre_usuario:req.body.username},{$set:{nombre_usuario:req.body.new_username}}).then((data)=>{console.log("Actualizado")}).catch((err)=>console.log("Algo salio mal al actualizar:",err));
};

module.exports=control;