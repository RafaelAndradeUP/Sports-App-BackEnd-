const Usuario = require('../modelos/modelousuario');
const fs = require('fs');
const SU = require('../modelos/modusuario_seguidor');
const ST= require('../modelos/modeloseguirtema.js');
const Tema=require('../modelos/modelotema');

const usuario = {};

usuario.getUser = async (req, res) => {
    try {
        let user = await Usuario.findById(req.params.userId)
        .select('-password')
        .exec();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


usuario.updateUser = async (req, res) => {
    try {
      let fields = req.fields;
      let files = req.files;
  
      let data = { ...fields };
  
      if (files.imagen) {
        let imagen = {};
        imagen.data = fs.readFileSync(files.imagen.path);
        imagen.contentType = files.imagen.type;
  
        data.imagen = imagen;
      }
  
      let updated = await Usuario.findByIdAndUpdate(req.params.userId, data, {
        new: true,
      }).select("-image.data");
  
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(400).send("Actualizacion fallida, intente de nuevo");
    }
  };

usuario.imagen = async (req, res) => {
    let user = await Usuario.findById(req.params.userId).exec();
    if (user && user.imagen && user.imagen.data !== null) {
      res.set("Content-Type", user.imagen.contentType);
      return res.send(user.imagen.data);
    }
  };

usuario.hasImage = async (req, res) => {
    let user = await Usuario.findById(req.params.userId).exec();
    if (user && user.imagen && user.imagen.data !== undefined) {
      return res.json({ ok: true });
    }
    return res.json({ ok: false });
  };

  usuario.follow =async(req,res)=>{
    try{
      let s= new SU(req.fields);
      await s.save();
      await Usuario.findByIdAndUpdate(s.Seguido,{$inc:{nseguidores:1}}).then((data)=>{console.log("Seguido")}).catch((err)=>console.log("Algo salio mal al seguir este usuario",err));
      res.status(200).json(s);

    }
    catch(error){
      res.status(400).json({message:error.message});
    }

  };

  usuario.followteam =async(req,res)=>{
    console.log(req.fields);
    try{
      let s= new ST(req.fields);
      let result = await s.save();
      res.status(200).json(result);

    }
    catch(error){
      res.status(400).json({message:error.message});
    }

  };

  usuario.unfollow =async(req,res)=>{
    try{
      const { docId, SeguidoID } = req.body; 
        await SU.findByIdAndRemove(docId);
        await Usuario.findByIdAndUpdate(SeguidoID,{$inc:{nseguidores: -1}}).then((data)=>{console.log("Dejo de seguir")}).catch((err)=>console.log("Algo salio mal al opinar:",err));
        res.status(200).send({
            ok: true
        });

    }
    catch(error){
      res.status(400).json({message:error.message});
    }

  };

  usuario.unfollowteam =async(req,res)=>{
    try{ 
        await ST.findByIdAndRemove(req.params.docId);
        res.status(200).send({
            ok: true
        });

    }
    catch(error){
      res.status(400).json({message:error.message});
    }

  };

  usuario.followtopic =async(req,res)=>{
    try{
      let s= new ST(req.fields);
      await s.save();
      await Tema.findByIdAndUpdate(s.temaId,{$inc:{nseguidores:1}}).then((data)=>{console.log("Seguido")}).catch((err)=>console.log("Algo salio mal al seguir tema",err));
      res.status(200).json(s);

    }
    catch(error){
      res.status(400).json({message:error.message});
    }

  };

  usuario.search=async(req,res)=>{
    try{
      let search_results = await Usuario.find({ $or: [ { nombre_usuario: { $regex: '.*' + req.params.searchCriteria + '.*' } }, { email: { $regex: '.*' + req.params.searchCriteria + '.*' } } ] })
      .select('-password').exec();
      res.status(200).json(search_results);
    }
    catch(error){s
      res.status(400).json({message:error.message});
    }

  };


module.exports = usuario;