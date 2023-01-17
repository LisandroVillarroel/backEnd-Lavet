const Empresas = require('../controladores/empresa.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/empresa', Empresas.buscaRut, Empresas.crearEmpresa);
    router.put('/empresa/:id',permiso, Empresas.buscaId, Empresas.actualizarEmpresa);
    router.get('/empresa/:id',permiso, Empresas.buscaId, Empresas.buscarEmpresa); 
    router.delete('/empresa/:id/:idUsu',permiso, Empresas.buscaId, Empresas.eliminarEmpresa);
    router.get('/empresaTodo', permiso, Empresas.buscarTodosEmpresa);
    router.get('/empresaListado/:listaEmp', permiso, Empresas.buscarTodosEmpresaListado);
}