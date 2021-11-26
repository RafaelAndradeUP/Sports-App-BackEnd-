const Usuario = require('../modelos/modelousuario');
const fs = require('fs');

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


module.exports = usuario;