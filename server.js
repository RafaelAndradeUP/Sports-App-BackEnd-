const express= require('express');
const mongoose = require('mongoose');
const router=express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const PORT = 8000;

const app= express();
const home=require('./src/controladores/home');
const publicacion=require('./src/controladores/publicacion');
const mongoURL= `mongodb+srv://RafaAndrade:${process.env.passDB}@yardercluster.p9cxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology: true}).then(()=>app.listen(PORT),()=> console.log("Servidor corriendo, MongoDB Conectado"))
.catch(()=> console.log("error:",err));

console.log(mongoURL);

router.get('/',home.inicio);

router.post('/publicar',publicacion.crear);

router.post('/:user_id/like',publicacion.like);

router.delete('/:post_id/delete',publicacion.eliminar);

router.get('/usuario/:id_usuario',home.chargeuser);

router.post('/registro',home.registro);
router.post("/login", home.login);

//Pendientes
router.get('/recuperarcontrasena',home.inicio);
router.post('/recuperarcontrasena',home.lostpassword);
router.get('/modificarperfil',home.inicio);
router.post('/modificarperfil',home.modificarperfil);

//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(router);


//app.listen(PORT, () => {
//  console.log(`Server running on port ${PORT}`);
//})