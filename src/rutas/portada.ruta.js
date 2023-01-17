const portada = require('../controladores/portada.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {

    router.get('/rescataTotalxEstadoLab/:idEmpresa', permiso, portada.buscaTotalxEstadosLab);
    router.get('/rescataTotalxEstadoCli/:idCliente', permiso, portada.buscaTotalxEstadosCli);
}
