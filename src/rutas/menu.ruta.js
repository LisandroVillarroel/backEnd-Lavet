const Menus = require('../controladores/menu.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/menu',  Menus.crearMenu);
    router.put('/menu/:id',permiso, Menus.buscaId, Menus.actualizarMenu);
    router.get('/menu/:id',permiso, Menus.buscaId, Menus.buscarMenu);
    router.delete('/menu/:id/:idUsu',permiso, Menus.buscaId, Menus.eliminarMenu);
    router.get('/menuNombre/:nombreM',permiso, Menus.buscarMenuNombre);
    router.get('/menuTodo', Menus.buscarTodosMenu);
}
