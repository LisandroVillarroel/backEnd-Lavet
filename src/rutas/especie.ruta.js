const Especies = require('../controladores/especie.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/especie',  Especies.crearEspecie);
    router.put('/especie/:id/:nombreEspecieAnterior',permiso, Especies.buscaId, Especies.actualizarEspecie);
    router.get('/especie/:id',permiso, Especies.buscaId, Especies.buscarEspecie);
    router.delete('/especie/:id/:idUsu',permiso, Especies.buscaId, Especies.eliminarEspecie);
    router.get('/especieTodo/:empresaId', permiso, Especies.buscarTodosEspecie);
}
