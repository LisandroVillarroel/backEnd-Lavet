const DoctorSolicitantes = require('../controladores/doctorSolicitante.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/doctorSolicitante', DoctorSolicitantes.buscaId, DoctorSolicitantes.crearDoctorSolicitante);
    router.put('/doctorSolicitante/:id',permiso, DoctorSolicitantes.buscaId, DoctorSolicitantes.actualizarDoctorSolicitante);
    router.get('/doctorSolicitante/:id',permiso, DoctorSolicitantes.buscaId, DoctorSolicitantes.buscarDoctorSolicitante);
    router.get('/doctorSolicitanteCliente/:idCliente',permiso, DoctorSolicitantes.buscaClienteDoctor);
    router.delete('/doctorSolicitante/:id/:idUsu',permiso, DoctorSolicitantes.buscaId, DoctorSolicitantes.eliminarDoctorSolicitante);
    router.get('/doctorSolicitanteTodo/:empresaId', permiso, DoctorSolicitantes.buscarTodosDoctorSolicitante);
}
