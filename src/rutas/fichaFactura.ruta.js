const Fichas = require('../controladores/fichaFactura.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
   
    router.put('/fichaAFactura/:ano/:mes',permiso, Fichas.actualizarFichaAFacturar);
    router.put('/fichaNumFactura',permiso, Fichas.actualizarFichaNumFactura);
    router.put('/fichaNumFacturaPagada',permiso, Fichas.actualizarFichaNumFacturaPagada);
    router.get('/fichaFacturaTodo/:empresaOrigen/:estadoFichaFacturacion/:usuario/:idCliente/:fechaInicio/:fechaFin/:tipoEmpresa', permiso, Fichas.buscarTodosFacturaFicha);
    router.get('/fichaFacturaPorEmpresa/:empresaOrigen/:estadoFichaFacturacion/:tipoEmpresa', permiso, Fichas.buscarEmpresaFacturaFicha);
    router.get('/fichaFacturaPorEmpresaTotal/:empresaOrigen/:estadoFichaFacturacion/:tipoEmpresa', permiso, Fichas.buscarFacturaPorEmpresaTotal);
    router.get('/fichaFacturaPorEmpresaTotalFacturado/:empresaOrigen/:fecha/:fechaHasta/:facturaPagada/:estadoFichaFacturacion/:tipoEmpresa', permiso, Fichas.buscarFacturaPorEmpresaTotalFacturado);
    router.get('/FichaFacturaDetalle/:empresaOrigen/:estadoFichaFacturacion/:idCliente/:fechaFacturacion/:tipoEmpresa', permiso, Fichas.buscarTodosFacturaFichaetalle);
    router.get('/fichaFacturaDetallePorFactura/:empresaOrigen/:estadoFichaFacturacion/:idCliente/:numFactura/:tipoEmpresa', permiso, Fichas.buscarTodosFacturaFichaetallePorFactura);
}
