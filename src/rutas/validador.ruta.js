const Validadores = require('../controladores/validador.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/validador', Validadores.buscaRut, Validadores.crearValidador);
    router.put('/validador/:id',permiso, Validadores.buscaId, Validadores.actualizarValidador);
    router.get('/validador/:id',permiso, Validadores.buscaId, Validadores.buscarValidador);
    router.delete('/validador/:id/:idUsu',permiso, Validadores.buscaId, Validadores.eliminarValidador);
    router.get('/validadorTodo/:empresaId', permiso, Validadores.buscarTodosValidador);
}