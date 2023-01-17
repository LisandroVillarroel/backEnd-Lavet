const Usuarios = require('./auth.controller.js');
module.exports = (router) => {
    router.post('/register', Usuarios.createUsuario);
    router.post('/login',Usuarios.loginUsuario);
}