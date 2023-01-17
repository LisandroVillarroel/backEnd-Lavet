const Accesos = require('./../controladores/acceso.controlador');
const permiso = require('./../middelware/permiso');

module.exports = (router) => {
    router.post('/acceso', Accesos.buscaUrl, Accesos.crearAcceso);
    router.put('/acceso/:id', permiso, Accesos.buscaId,Accesos.actualizarAcceso);
    router.get('/acceso/:id', permiso, Accesos.buscaId,Accesos.buscarAcceso);
    router.delete('/acceso/:id/:idUsu', Accesos.buscaId,Accesos.eliminarAcceso);
    router.get('/accesoTodo/:empresa_id', permiso, Accesos.buscaId,Accesos.buscarTodosAcceso);
}
