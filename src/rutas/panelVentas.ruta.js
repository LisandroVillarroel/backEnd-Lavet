const panelVentas = require('../controladores/panelVentas.controlador.js');
const permiso = require('../middelware/permiso');
const path = require('path');

module.exports = (router) => {

    router.get('/generalVentas/:ano/:mes/:idLaboratorio/:idClienteVet', permiso, panelVentas.buscaGeneralVentas);
    router.get('/ComparaVentasAnoAnterior/:ano/:mes/:idLaboratorio/:idClienteVet', permiso, panelVentas.buscaVentasComparativoAnterior);
    router.get('/ventasPorExamen/:ano/:mes/:idLaboratorio/:idClienteVet', permiso, panelVentas.buscaVentasPorExamenes);
    router.get('/ventasPorDia/:ano/:mes/:idLaboratorio/:idClienteVet', permiso, panelVentas.buscaVentasPorDia);
    router.get('/ventasPorCliente/:ano/:mes/:idLaboratorio/:idClienteVet', permiso, panelVentas.buscaVentasPorCliente);
}
