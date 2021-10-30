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
control.registro = async (req,res)=>{
    try {
        const { name, email, password } = req.body;
        // validation
        if (!name || name.length < 3)
          return res.status(400).send("Nombre inválido.");
        if (!password || password.length < 6)
          return res
            .status(400)
            .send("Contraseña requerida y con mínimo de 6 caracteres.");
        let userExist = await Usuario.findOne({ email }).exec();
        if (userExist)
          return res
            .status(400)
            .send("Usuario con ese correo ya existe en la base de datos.");
        // register
        const user = new Usuario(req.body);
    
        await user.save();
        // console.log("USER CREATED", user.fields);
        return res.json({ ok: true });
      } catch (err) {
        // console.log("CREATE USER FAILED", err);
        return res.status(400).send("Error. Por favor, vuelva a intentar.");
      }
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