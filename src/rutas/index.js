const express=require('express');
const router=express.Router();

const home=require('../controladores/home');
const publicacion=require('../controladores/publicacion');


module.exports =app=>{
    router.get('/',home.inicio);

    router.get('/publicar',home.inicio);
    router.post('/publicar',publicacion.crear);

    router.post('/:post_id/like',publicacion.like);

    router.delete('/:post_id/delete',publicacion.eliminar);

    router.get('/usuario/:id_usuario',home.chargeuser);

    router.get('/login',home.inicio);
    router.post('/login',home.iniciosesion);

    router.get('/registro',home.inicio);
    router.post('/registro',home.registro);

    router.get('/recuperarcontrasena',home.inicio);
    router.post('/recuperarcontrasena',home.lostpassword);
    
    
    router.get('/modificarperfil',home.inicio);
    router.post('/modificarperfil',home.modificarperfil);

    app.use(router);
}