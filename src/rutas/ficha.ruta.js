const Fichas = require('../controladores/ficha.controlador.js');
const permiso = require('../middelware/permiso');
const upload_ = require('../middelware/multer');
const path = require('path');

module.exports = (router) => {
    router.post('/ficha/:numCorrelativo',  Fichas.crearPropietario, Fichas.crearFicha);
    router.put('/ficha/:id',permiso, Fichas.crearPropietario,Fichas.buscaId, Fichas.actualizarFicha);
    router.put('/fichaEnvia/:id',permiso, Fichas.crearPropietario,Fichas.buscaId, Fichas.actualizarFichaEnvia);
    router.put('/fichaCorreo/:id',permiso,Fichas.buscaId, Fichas.actualizarFichaCorreoClienteFinal);
    router.get('/ficha/:id',permiso, Fichas.buscaId, Fichas.buscarFicha);
    router.delete('/ficha/:id/:idUsu',permiso, Fichas.buscaId, Fichas.eliminarFicha);
    router.get('/fichaTodo/:empresaOrigen/:estadoFicha/:usuario/:tipoPermiso/:idUsuarioAsignado', permiso, Fichas.buscarTodosFicha);
    router.get('/fichaTodoPorFecha/:empresaOrigen/:estadoFicha/:usuario/:fechaInicio/:fechaFin/:tipoPermiso/:idUsuarioAsignado', permiso, Fichas.buscarTodosFichaPorFecha);
    router.get('/fichaTodoVet/:empresaOrigen/:estadoFicha/:usuario', permiso, Fichas.buscarTodosFichaVet);
    router.get('/fichaTodoPorFechaVet/:empresaOrigen/:estadoFicha/:usuario/:fechaInicio/:fechaFin', permiso, Fichas.buscarTodosFichaPorFechaVet);
    router.post('/fichaSubeArchivo/:ficha_id', permiso, upload_(),Fichas.envioCorreo);      // Envía correo a Veterinaria
    router.post('/envioExamenCorreoClienteFinal/:ficha_id', permiso,Fichas.envioCorreoClienteFinal);  // Envia correo a Cliente Final
    router.post('/envioCorreoSolicitudCliente/:id', permiso,Fichas.envioCorreoSolicitudCliente);  // Envia correo de lña solicitud realizada por Cliente(Veterinaria)
    router.post('/pruebaSendgrid', permiso, upload_(),Fichas.envioCorreoSendGrid);      // PruebaSendgrid
 //   router.post('/envioExamenCorreo/:ficha_id', permiso,Fichas.envioCorreo);
    //router.post('/fichaSubeArchivo/:empresa_id/:rutEmpresa/:nombreExamen/:numFicha/:ficha_id', permiso, upload_(),Fichas.subeArchivo);
    
  /*  router.post('/fichaSubeArchivo/:directorio', upload_(),(req,res)=>{
        console.log('paso sube:',req.file);
        res.send('ok');
    });
    */
    //router.post('/fichaDescargaArchivo', permiso, Fichas.subeArchivo);
    router.post('/fichaDescargaArchivo', (req,res,next)=>{
        filepath = path.join(__dirname,'../../public/pdfs/'+ req.body.filename) ;
        console.log('ruta:',filepath);
        res.sendFile(filepath);
    });
}
