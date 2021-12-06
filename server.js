const express= require('express');
const mongoose = require('mongoose');
const router=express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const formidable = require('express-formidable');


dotenv.config();
const PORT = 8000;

const app= express();
const home=require('./src/controladores/home');
const usuario=require('./src/controladores/usuario');
const publicacion=require('./src/controladores/publicacion');
const mongoURL= `mongodb+srv://RafaAndrade:${process.env.passDB}@yardercluster.p9cxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology: true})
.then(() => console.log('MongoDB conectado'))
.catch(()=> console.log("error:",err));

router.get('/',home.inicio);

router.post('/publicar', formidable(), publicacion.crear);

router.post('/nuevolike', formidable(),publicacion.like);
router.post('/dislike',publicacion.dislike);

router.delete('/delete/:postId',publicacion.eliminar);

router.get('/posts/:userId', publicacion.posts);
router.get('/pl/:userId', publicacion.pls);
router.get('/su/:userId', publicacion.sus);
router.get('/st/:userId', publicacion.sts);
router.get('/posts/imagen/:postId', publicacion.imagen);

router.get('/usuario/:userId',usuario.getUser);
router.get('/usuario/imagen/:userId', usuario.imagen);
router.get('/usuario/hasimage/:userId', usuario.hasImage);
router.put('/usuario/update/:userId', formidable(), usuario.updateUser);

router.get('/usuario/posts/:userId',home.chargeuser);
//Seguir usuario
router.post('/nuevoseguidor',formidable(),usuario.follow);
router.post('/nuevoseguidorequipo',formidable(),usuario.followteam);
router.post('/dejardeseguir', usuario.unfollow);
router.post('/dejardeseguirequipo/:docId', usuario.unfollowteam);
//Seguir tema (equipo,etc)
router.post('/seguirequipo',formidable(),usuario.followtopic);
//Buscar usuarios
router.get('/buscar/:searchCriteria',usuario.search);
//Devolver los posts de los usuarios a los que sigues
router.get('/posts/favoritos/:userId',home.FavPosts);
//Devolver los posts de los temas a los que sigues
router.get('/temas/favoritos/:userId',home.FavTopics);

router.post('/registro',home.registro);
router.post("/login", home.login);



//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});