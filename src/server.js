"use strict"
require('dotenv').config(); // Variables glovales en .env
const cors = require('cors');
const authRoutes = require('./auth/auth.routes.js');
const clienteRuta = require('./rutas/cliente.ruta.js');
const propietarioRuta = require('./rutas/propietario.ruta.js');
const examenRuta = require('./rutas/examen.ruta.js');
//const formatosRuta = require('./rutas/formatos.ruta.js');
//const formato1Ruta = require('./rutas/formato1.ruta.js');
const fichaRuta = require('./rutas/ficha.ruta.js');
const empresaRuta = require('./rutas/empresa.ruta.js');
const accesoRuta = require('./rutas/acceso.ruta.js');
const usuarioRuta = require('./rutas/usuario.ruta.js');
const especieRuta = require('./rutas/especie.ruta.js');
const razaRuta = require('./rutas/raza.ruta.js');
const examenFicha = require('./rutas/examenFicha.ruta.js');
const doctorSolicitante = require('./rutas/doctorSolicitante.ruta.js');
const validadores = require('./rutas/validador.ruta.js');
const parametroRuta = require('./rutas/parametro.ruta.js');
const menuRuta = require('./rutas/menu.ruta.js');

const panelVentas = require('./rutas/panelVentas.ruta.js');
const fichaFacturas = require('./rutas/fichaFactura.ruta.js');

const portada = require('./rutas/portada.ruta.js');

const express = require('express');
const propiedadesDb = require('./config/propiedades');
const DB = require('./config/db');

// Iniciar DB
DB(); 

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

/*app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false,
  parameterLimit:50000
}));
*/
/*
var jsonParser = bodyParser.json({limit:1024*1024*10, type:'application/json'}); 
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*10,type:'application/x-www-form-urlencoded' });
app.use(jsonParser);
app.use(urlencodedParser);
*/
/*
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
*/

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({
  limit: '500mb',
  extended: true,
  parameterLimit:5000000
}));



 app.use(cors());

var helmet = require('helmet');
app.use(helmet());

 //No muestra la cabecera en Network

 app.use(function (req, res, next) {  
    res.header("X-powered-by", "");
    next();
  });

 // Router
 ////Autentica Usuario
app.use('./api', router);
authRoutes(router);
//// cliente
app.use('./api',router);
clienteRuta(router);

//// propietario
app.use('./api',router);
propietarioRuta(router);

//// examen
app.use('./api',router);
examenRuta(router);

//// formatos
//app.use('./api',router);
//formatosRuta(router);

//// formato1
//app.use('./api',router);
//formato1Ruta(router);

//// ficha
app.use('./api',router);
fichaRuta(router);

//// Empresa
app.use('./api',router);
empresaRuta(router);

//// Acceso
app.use('./api',router);
accesoRuta(router);

//// Usuario
app.use('./api',router);
usuarioRuta(router);

//// Especie
app.use('./api',router);
especieRuta(router);

//// Raza
app.use('./api',router);
razaRuta(router);

//// Exámen Ficha
app.use('./api',router);
examenFicha(router);

//// Doctor Solicitante
app.use('./api',router);
doctorSolicitante(router);

//// Doctor Validadores
app.use('./api',router);
validadores(router);

//// parametro
app.use('./api',router);
parametroRuta(router);

//// menu
app.use('./api',router);
menuRuta(router);

//// panelVentas
app.use('./api',router);
panelVentas(router);

//// Facturas
app.use('./api',router);
fichaFacturas(router);

//// portada
app.use('./api',router);
portada(router);

router.get('/', (req,res) => {
    res.send('Ruta Inicial');
});
app.use(router);


app.listen(propiedadesDb.PORT,() => console.log(`Servidor en puerto ${propiedadesDb.PORT}`));
