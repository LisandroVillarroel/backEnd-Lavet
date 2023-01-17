const Clientes = require('../controladores/cliente.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/cliente', Clientes.buscaRut, Clientes.crearCliente);
    router.post('/clienteEmpresa', Clientes.crearClienteEmpresa);
    router.put('/cliente/:id',permiso, Clientes.buscaId, Clientes.actualizarCliente);
    router.get('/cliente/:id',permiso, Clientes.buscaId, Clientes.buscarCliente);
    router.put('/cliente/:id/:empresa_Id/:idUsu',permiso, Clientes.buscaId, Clientes.eliminarCliente);
    router.get('/buscaClientePorRut/:rutCliente',permiso, Clientes.buscaClientePorRut);
    router.get('/buscarEmpresasCliente/:id', permiso,Clientes.buscarEmpresasCliente);
    router.get('/clienteTodo/:empresaId', permiso, Clientes.buscarTodosCliente);
}
