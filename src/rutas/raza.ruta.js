const Razas = require('../controladores/raza.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/raza',  Razas.buscaEspecieRaza,Razas.crearRaza);
    router.post('/razaMasiva',  Razas.crearRazaMasiva);
    router.put('/raza/:id',permiso, Razas.buscaId, Razas.actualizarRaza);
    router.get('/raza/:id',permiso, Razas.buscaId, Razas.buscarRaza);
    router.delete('/raza/:id/:idUsu',permiso, Razas.buscaId, Razas.eliminarRaza);
    router.get('/razaTodo/:empresaId', permiso, Razas.buscarTodosRaza);
    router.get('/razaTodo/:empresaId/:nombreEspecie', permiso, Razas.buscarTodosRazaEspecie);
}
