const Examenes = require('../controladores/examen.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/examen',  Examenes.crearExamen);
    router.put('/examen/:id',permiso, Examenes.buscaId, Examenes.actualizarExamen);
    router.get('/examen/:id',permiso, Examenes.buscaId, Examenes.buscarExamen);
    router.delete('/examen/:id/:idUsu',permiso, Examenes.buscaId, Examenes.eliminarExamen);
    router.get('/examenTodo/:empresaId', Examenes.buscarTodosExamen);
}
