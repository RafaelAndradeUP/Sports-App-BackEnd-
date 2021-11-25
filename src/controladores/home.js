const PL = require('../modelos/modelopost_like');
const SU = require('../modelos/modusuario_seguidor');
const Post = require('../modelos/modelopost');
const Usuario = require('../modelos/modelousuario');
const jwt = require('jsonwebtoken');

const control={};

control.inicio=(req,res)=>{
  
    //Post.find({},function(err,posts){
        //res.send({postsList:posts});
        
    //});
    res.send("Hola Mundo");
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

control.login = async (req,res)=>{
    console.log(req.body);
    try {
        const { email, password } = req.body;
        let user = await Usuario.findOne({ email }).exec();
        console.log(user);
        if (!user)
            return res.status(400).send("Usuario inexistente con ese correo.");
        if(password == user.password){
          let token = jwt.sign({ _id: user._id }, 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzNTU1NDcwOSwiaWF0IjoxNjM1NTU0NzA5fQ.75RYl9DFeoapUhTUFe9_dT1cfm57K4C35-MSzZvP1Is', {
            expiresIn: "3650d",
          });
          res.json({
            token,
            user: {
              _id: user._id,
              nombre_usuario: user.nombre_usuario,
              email: user.email,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            },
          });
        }
        else{
            return res.status(400).send("Contraseña Incorrecta.");
        }
      } catch (err) {
        //console.log("LOGIN ERROR", err);
        res.status(400).send("Error al iniciar sesión");
      }
};

control.registro = async (req,res)=>{
    console.log(req);
    try {
        const { nombre_usuario, email, password } = req.body;
        // validation
        if (!nombre_usuario || nombre_usuario.length < 3)
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