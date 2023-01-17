const ExamenFichas = require('../controladores/examenFicha.controlador');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/examenFicha',  ExamenFichas.crearExamenFicha);
    router.put('/examenFicha/:id',permiso, ExamenFichas.buscaId, ExamenFichas.actualizarExamenFicha);
    router.get('/examenFicha/:id',permiso, ExamenFichas.buscaId, ExamenFichas.buscarExamenFicha);
    router.delete('/examenFicha/:id/:idUsu',permiso, ExamenFichas.buscaId, ExamenFichas.eliminarExamenFicha);
    router.get('/examenFichaTodo', permiso, ExamenFichas.buscarTodosExamenFicha);
}
