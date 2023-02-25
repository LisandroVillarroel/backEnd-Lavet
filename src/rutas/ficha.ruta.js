const Fichas = require('../controladores/ficha.controlador.js');
const permiso = require('../middelware/permiso');
const upload_ = require('../middelware/multer');
const uploadArchivos_ = require('../middelware/multerMultiple');
const uploadArchivosExterno_= require('../middelware/multerMultipleExterno');



const path = require('path');
/*
//Esta función guarda el mismo archivo en local y en el storage
async function multiUpload(req, res, next) {
    await upload_(req, res, next)
    await uploadFtp_(req, res, next);
    next();
}
*/
module.exports = (router) => {
    router.post('/ficha',  Fichas.crearPropietario, Fichas.crearFicha);
    router.put('/ficha/:id',permiso, Fichas.crearPropietario,Fichas.buscaId, Fichas.actualizarFicha);
    router.put('/fichaAnaliza/:id',permiso, Fichas.crearPropietario,Fichas.buscaId, Fichas.actualizarFichaAnaliza);
    router.put('/fichaCorreo/:id',permiso,Fichas.buscaId, Fichas.actualizarFichaCorreoClienteFinal);
    router.get('/ficha/:id',permiso, Fichas.buscaId, Fichas.buscarFicha);
    router.delete('/ficha/:id/:idUsu',permiso, Fichas.buscaId, Fichas.eliminarFicha);
    router.get('/fichaTodo/:empresaOrigen/:estadoFicha/:usuario/:tipoPermiso/:idUsuarioAsignado', permiso, Fichas.buscarTodosFicha);
    router.get('/fichaTodoPorFecha/:empresaOrigen/:estadoFicha/:usuario/:fechaInicio/:fechaFin/:tipoPermiso/:idUsuarioAsignado', permiso, Fichas.buscarTodosFichaPorFecha);
    router.get('/fichaTodoVet/:empresaOrigen/:estadoFicha/:usuario', permiso, Fichas.buscarTodosFichaVet);
    router.get('/fichaTodoPorFechaVet/:empresaOrigen/:estadoFicha/:usuario/:fechaInicio/:fechaFin', permiso, Fichas.buscarTodosFichaPorFechaVet);
    router.post('/fichaSubeArchivo/:ficha_id', permiso, upload_(),Fichas.envioCorreo,(req,res)=>{
        console.log('elimina:');
       // res.send('ok');
    });      // Envía correo a Veterinaria
    router.post('/envioExamenCorreoClienteFinal/:ficha_id', permiso,Fichas.envioCorreoClienteFinal);  // Envia correo a Cliente Final
    router.post('/envioCorreoSolicitudCliente/:id', permiso,Fichas.envioCorreoSolicitudCliente);  // Envia correo de lña solicitud realizada por Cliente(Veterinaria)
    //router.post('/pruebaSendgrid', permiso, upload_(),Fichas.envioCorreoSendGrid);      // PruebaSendgrid
   // router.post('/pruebaFtp',uploadFtp_()); 

    router.get('/paciente/:runPropietario', permiso, Fichas.buscarPacientes);
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

    router.get('/armaConsultaXfichaParaEnvio/:empresaOrigen', permiso, Fichas.armaConsultaXfichaParaEnvio);
    router.get('/detalleXfichaParaEnvio/:empresaOrigen/:id_Ficha', permiso, Fichas.detalleXfichaParaEnvio);
    router.post('/envioCorreoTodosExamen/:rutEmpresaDirectorio/:id_Ficha/:empresaOrigen/:usuario/:correoCliente', permiso, uploadArchivos_(),Fichas.envioCorreoTodosExamenes,(req,res)=>{console.log('file req:',req.files);});      // Envía correo a Cliente
    router.post('/envioCorreoUnicoExamenes/:_id/:rutEmpresaDirectorio/:numeroFicha/:empresaOrigen/:usuario/:correoCliente', permiso, uploadArchivos_(),Fichas.envioCorreoUnicoExamenes,(req,res)=>{console.log('file req:',req.files);});      // Envía correo a Cliente
    router.post('/subePdfExamenExterno/:_id/:rutEmpresaDirectorio/:id_Ficha/:numeroFicha/:empresaOrigen/:usuario', permiso, uploadArchivosExterno_(),Fichas.cambiaEstadoFicha,(req,res)=>{console.log('file req:',req.files);});      // SubeArchivo Externo
    

    
}
