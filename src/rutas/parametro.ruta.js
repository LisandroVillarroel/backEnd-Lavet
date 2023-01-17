const Parametros = require('../controladores/parametro.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/parametro', Parametros.crearParametro);
    router.put('/parametro/:id',permiso, Parametros.buscaId, Parametros.actualizarParametro);
    router.get('/parametro/:id',permiso, Parametros.buscaId, Parametros.buscarParametro);
    router.get('/parametroLetra/:letra',permiso, Parametros.buscarParametroLetra);
    router.delete('/parametro/:id/:idUsu',permiso, Parametros.buscaId, Parametros.eliminarParametro);
    router.get('/parametroTodo/:empresaId', permiso, Parametros.buscarTodosParametro);
}
