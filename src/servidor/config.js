const path = require("path");

const exphbs =require('express-handlebars');
const morgan = require('morgan');
const multer= require('multer');
const express= require('express');
const rutas =require('../rutas/index');
const errorHandler = require("errorhandler");
module.exports= app=> {
    //Configuracion
    app.set('port',process.env.PORT || 3000);
    app.set("paginas", path.join(__dirname, "../paginas"));
    app.engine('.hbs',exphbs({
        defaultLayout:'main',
        partialsDir: path.join(app.get('paginas'),'parciales'),
        layoutsDir: path.join(app.get('paginas'),'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));
    app.set("view engine", ".hbs");
    
    //Middlewares
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname,'../public/upload/temp')}).single('imagen'));
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());

    //Rutas
    rutas(app);
    //Archivos estáticos
    app.use('/public',express.static(path.join(__dirname,'../public')));
    //Manejo de errores
    if('En desarrollo'===app.get('env')){
        app.use(errorHandler);
    }

    return app;
}