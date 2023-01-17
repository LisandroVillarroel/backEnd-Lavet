'use strict'
const Usuario = require('./auth.dao');
const jwt = require('jwt-simple');  ////require(jsonwebtoken);
const bcrypt = require('bcryptjs');
const moment = require('moment');
const codSecretoToken = require('./../config/propiedades');
//const SECRET_KEY = 'seretokysgv';


exports.createUsuario = (req, res, next) => {
    console.log('paso crea usu:',req.body);
    const newUsuario = {
        usuario: req.body.usuario,
        contrasena: bcrypt.hashSync(req.body.contrasena),
        rutUsuario: req.body.rutUsuario,
        nombres: req.body.nombres,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno,
        empresa: {
            empresa_Id: req.body.empresa.empresa_Id,
            rutEmpresa: req.body.empresa.rutEmpresa,
            menu_Id: req.body.empresa.menu_Id
        }
    }
    Usuario.create (newUsuario,(err, _usuario) => {
        if (err && err.code === 11000) return res.status(409).send('Usuario ya existe');
        if(err) return res.status(500).send('Error de Servidor'+err);
////        const payload = {
////            sub: _usuario.id,
////            iat: moment().unix,
////            exp: moment().add(14,'minute').unix()
////        }
////        const accessToken = jwt.encode(payload,codSecretoToken.SECRET_KEY);

        const usuarioDato = {
            usuario: _usuario.usuario
////            accessToken: accessToken
            }
        // response
        res.send({usuarioDato})    
    })
}

exports.loginUsuario = (req,res,next) => {
    const DatoUsuario = {
        usuario: req.body.usuario,
        contrasena: req.body.contrasena
    }
   // console.log('datos: ',DatoUsuario)
    Usuario.login({usuario: DatoUsuario.usuario},(err,_usuario) => {
        if(err) {
            console.log('error: ',err);
            return res.status(500).send('Error Servidor');
        }
        if (!_usuario){
            // Usuario No existe

            res.status(409).send({message:'Contraseña o Usuario no coinciden'})
            //res.send({_usuario});
        }else{
            const resultContrasena = bcrypt.compareSync(DatoUsuario.contrasena,_usuario.contrasena);
            if (resultContrasena){  // si la contraseña corresponde True
                const payload = {
                    sub: _usuario.id,
                    iat: moment().unix,
                    //exp: moment().add(24 * 60 * 60,'minute').unix()
                    exp: moment().add(1,'d').unix()  // tiempo que expira token 1 día
                }
                const accessToken = jwt.encode(payload,codSecretoToken.SECRET_KEY);

                //const expiresIn = 24 * 60 * 60;
                //const accessToken = jwt.sign({id: _usuario.id},
                //    SECRET_KEY, {
                //        expiresIn: expiresIn
                //    })
                   console.log('usuario:',_usuario);

                   const   empresaConectadaI= {
                            empresa_Id: _usuario.usuarioLaboratorioCliente.laboratorioCliente_Id,
                            rutEmpresa: _usuario.usuarioLaboratorioCliente.laboratorioCliente_rut,
                            razonSocial: _usuario.usuarioLaboratorioCliente.laboratorioCliente_razonSocial,
                            nombreFantasia: _usuario.usuarioLaboratorioCliente.laboratorioCliente_nombreFantasia,
                            menu_Id: _usuario.usuarioLaboratorioCliente.laboratorioCliente_menu_Id,
                            tipoEmpresa: _usuario.usuarioLaboratorioCliente.laboratorioCliente_tipoEmpresa,
                        }

                    
                    const usuarioDato = {
                        _id: _usuario._id,
                        usuario: _usuario.usuario,
                        nombres:  _usuario.nombres,
                        apellidoPaterno: _usuario.apellidoPaterno,
                        apellidoMaterno: _usuario.apellidoMaterno,
                        empresaConectada: empresaConectadaI,
                        accessToken: accessToken,

                     ////   expiresIn: expiresIn
                      }
                   //   console.log('token',usuarioDato);
                res.send({usuarioDato});
            }
            else {
                // Contraseña no existe
                res.status(409).send({message:'Contraseña o Usuario no coinciden'});
            }
        }
    })
}