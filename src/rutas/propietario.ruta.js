const Propietarios = require('../controladores/propietario.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/propietario',  Propietarios.crearPropietario);
    router.put('/propietario/:id',permiso, Propietarios.buscaId, Propietarios.actualizarPropietario);
    router.get('/propietario/:id',permiso, Propietarios.buscaId, Propietarios.buscarPropietario);
    router.get('/propietarioRut/:rutPropietario',permiso,  Propietarios.buscarRut);
    router.delete('/propietario/:id/:idUsu',permiso, Propietarios.buscaId, Propietarios.eliminarPropietario);
    router.get('/propietarioTodo', permiso, Propietarios.buscarTodosPropietario);
}
