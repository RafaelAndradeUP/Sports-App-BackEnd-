const express= require('express');
const mongoose = require('mongoose');
const router=express.Router();

const PORT = 8000;

const app= express();
const home=require('./src/controladores/home');
const publicacion=require('./src/controladores/publicacion');

mongoose.connect('mongodb://127.0.0.1:27017/yarder').then(()=> console.log("MongoDB Conectado"))
.catch(()=> console.log("error:",err));

router.get('/',home.inicio);

router.get('/publicar', publicacion.crear);
router.post('/publicar',publicacion.crear);

router.post('/:post_id/like',publicacion.like);

router.delete('/:post_id/delete',publicacion.eliminar);

router.get('/usuario/:id_usuario',home.chargeuser);

router.post('/registro',home.registro);

router.get('/recuperarcontrasena',home.inicio);
router.post('/recuperarcontrasena',home.lostpassword);


router.get('/modificarperfil',home.inicio);
router.post('/modificarperfil',home.modificarperfil);

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})