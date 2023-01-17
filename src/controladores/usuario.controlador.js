const usuario = require('../modelos/usuario.modelo');
const empresa = require('../modelos/empresa.modelo');
const cliente = require('../modelos/cliente.modelo');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple'); 
const moment = require('moment');
const codSecretoToken = require('./../config/propiedades');
const mailerReset = require('./../template/envioCorreoReseteaContrasenaSendGrid')

async function crearUsuario(req,res) {    
        if(req.body.usuarios){             // Si trae información de la búsqueda anterior
            respuesta = {       
                error: true, 
                data: '',
                codigo: 400, 
                mensaje: 'Ya existe'
               };
            return res.status(200).json(respuesta);
        }
        try {
          
            req.body.contrasena=bcrypt.hashSync(req.body.contrasena)
            const usuario_resp = await new usuario(req.body).save()
        
            respuesta = {
                error: false, 
                data: usuario_resp,
                codigo: 200, 
                mensaje: 'ok'
            };
            res.status(200).json(respuesta)
        } catch(error) {
            if (error.name === 'MongoError' && error.code === 11000) {
                respuesta = {       
                    error: true, 
                    data: '',
                    codigo: 400, 
                    mensaje: 'Usuario Ya Existe'
                   };
                return res.status(200).json(respuesta);
            }
            respuesta = {
                error: true, 
                data: '',
                codigo: 500, 
                mensaje: error
            };
            console.log(respuesta);
            return res.status(500).json(respuesta);
        }   
}

async function actualizarUsuario(req,res) {

    if(req.body.error){ // Si biene un error de la busueda anterior
        console.log('error1');
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
           };
            console.log(respuesta);
            return res.status(500).json(respuesta);
    }

    if(!req.body.usuarios){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Usuario'
           };
            return res.status(404).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let usuario_actualiza = req.body;
        usuario_actualiza = Object.assign(usuario_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        await usuario.updateOne({_id: req.params.id},usuario_actualiza) 
        
        respuesta = {
            error: false, 
            data: '',
            codigo: 200, 
            mensaje: 'ok'
        };
        res.status(200).json(respuesta)
    } catch(error) {
        console.log('error2');
        respuesta = {
          error: true, 
          data: '',
          codigo: error.codigo, 
          mensaje: error
         };
          console.log(respuesta);
          return res.status(error.codigo).json(respuesta);
      }   

}

async function actualizarUsuarioContrasena(req,res) {

    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
           };
            console.log(respuesta);
            return res.status(500).json(respuesta);
    }

    if(!req.body.usuarios){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Usuario'
           };
           console.log('404',respuesta);
            return res.status(200).json(respuesta);
    }
    try {
        console.log('contraseña base:',req.body.usuarios[0].contrasena);
        console.log('contraseña nueva:',bcrypt.hashSync('1'));
        console.log('contraseña nueva:',bcrypt.hashSync(req.body.contrasenaActual));
        console.log('req:',req.body);

        const resultContrasena = bcrypt.compareSync(req.body.usuarios[0].contrasena,req.body.contrasenaActual); //Base,parámetro
          if (resultContrasena){  // si la contraseña corresponde True
      //  if(req.body.usuarios[0].contrasena!=bcrypt.hashSync(req.body.contrasenaActual)){             // Si las contraseñas son distintas
            respuesta = {       
                error: true, 
                data: '',
                codigo: 404, 
                mensaje: 'La contraseña Actual no corresponde'
            };
                return res.status(200).json(respuesta);
        }
   
   
   //console.log('res:',res);
    // si encontro información reemplaza información
   
        req.body.contrasena=bcrypt.hashSync(req.body.contrasena)
        let usuario_actualiza = req.body;
        usuario_actualiza = Object.assign(usuario_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        await usuario.updateOne({_id: req.params.id},usuario_actualiza) 
        
        respuesta = {
            error: false, 
            data: '',
            codigo: 200, 
            mensaje: 'ok'
        };
        res.status(200).json(respuesta)
    } catch(error) {
        respuesta = {
          error: true, 
          data: '',
          codigo: error.codigo, 
          mensaje: error
         };
          console.log(respuesta);
          return res.status(error.codigo).json(respuesta);
      }   

}

async function actualizarUsuarioContrasenaReset(req,res) {

    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
           };
            console.log(respuesta);
            return res.status(500).json(respuesta);
    }

    if(!req.body.usuarios){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Usuario'
           };
           console.log('404',respuesta);
            return res.status(200).json(respuesta);
    }
    try {

        console.log('req:',req.body);

   
   
   //console.log('res:',res);
    // si encontro información reemplaza información
   
        req.body.contrasena=bcrypt.hashSync(req.body.contrasena)
        let usuario_actualiza = req.body;
        usuario_actualiza = Object.assign(usuario_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        await usuario.updateOne({_id: req.params.id},usuario_actualiza) 
        
        respuesta = {
            error: false, 
            data: '',
            codigo: 200, 
            mensaje: 'ok'
        };
        res.status(200).json(respuesta)
    } catch(error) {
        respuesta = {
          error: true, 
          data: '',
          codigo: error.codigo, 
          mensaje: error
         };
          console.log(respuesta);
          return res.status(error.codigo).json(respuesta);
      }   

}


async function reseteaUsuarioContrasena(req,res) {

    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
           };
            console.log(respuesta);
            return res.status(500).json(respuesta);
    }
    console.log('respuesta busca usuario:',req.body);
    if(!req.body.usuarios){             // Si no trae información de la búsqueda anterior
        console.log('paso busca usuario ');
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Usuario'
           };
            return res.status(200).json(respuesta);
    }
    try {
        req.body.usuarios[0]._id
         
        const payload = {
            sub: req.body.usuarios[0]._id,
            iat: moment().unix,
            //exp: moment().add(24 * 60 * 60,'minute').unix()
            exp: moment().add(14,'minute').unix()  // tiempo que expira token
        }
        const accessTokenReset = jwt.encode(payload,codSecretoToken.SECRET_KEYRESET);
        verificaLink=`http://${req.params.urlFront}/resetKey/${accessTokenReset}/${req.body.usuarios[0]._id}`
        req.body.usuarios[0].resetToken=accessTokenReset;
        let usuario_actualiza = req.body;
        usuario_actualiza = Object.assign(usuario_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        await usuario.updateOne({_id: req.params.id},usuario_actualiza) 
        console.log('usuario rescatado:',req.body.usuarios[0].empresa);
        let query={};
        query={_id: req.body.usuarios[0].empresa.empresa_Id, estado: {$ne:'Borrado'}};
        console.log('query empresa:',query);
        const empresa_ = await empresa.find(query)
        console.log('empresa:',empresa_)
        mailerReset.enviar_mailReset(empresa_,req.body.usuarios[0].nombres,req.body.usuarios[0].apellidoPaterno,verificaLink);

        respuesta = {
            error: false, 
            data: req.body.usuarios[0].email,
            codigo: 200, 
            mensaje: 'ok'
        };

        res.status(200).json(respuesta)
    } catch(error) {
        respuesta = {
          error: true, 
          data: '',
          codigo: error.codigo, 
          mensaje: error
         };
          console.log(respuesta);
          return res.status(error.codigo).json(respuesta);
      }   

}

function buscarUsuarioPermiso(req,res) {
    let tipoPermiso='';
    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
        };
        return res.status(500).json(respuesta);
    }

    if(req.body.usuarios){  // si la función de busqueda encontro información
       console.log('dto usuario:',req.body.usuarios[0].MenuItem)
       for (a = 0; a < req.body.usuarios[0].MenuItem.length; a++) {
        if (req.body.usuarios[0].MenuItem[a].route==req.params.route){
            tipoPermiso=req.body.usuarios[0].MenuItem[a].tipoPermiso
            break;
        }
       }
            
    
        respuesta = {
            error: false, 
            data: tipoPermiso,
            codigo: 200, 
            mensaje: 'ok'
        };
        return res.status(200).json(respuesta);
    }
   //si no encontro registros
    respuesta = {
        error: false, 
        data: '',
        codigo: 404, 
        mensaje: 'No encontró el Usuario'
    };
    return res.status(404).json(respuesta);
}

function buscarUsuario(req,res) {
   
    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
        };
        return res.status(500).json(respuesta);
    }

    if(req.body.usuarios){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.usuarios,
            codigo: 200, 
            mensaje: 'ok'
        };
        return res.status(200).json(respuesta);
    }
   //si no encontro registros
    respuesta = {
        error: false, 
        data: '',
        codigo: 404, 
        mensaje: 'No encontró el Usuario'
    };
    return res.status(404).json(respuesta);
}

async function eliminarUsuario(req,res) {

    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
           };
            return res.status(500).json(respuesta);
    }

    if(!req.body.usuarios){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Usuario'
           };
            return res.status(404).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        queryModifica={usuarioModifica_id: req.params.idUsu, estado:'Borrado'};
        await usuario.updateOne({_id: req.params.id},queryModifica) 
        
        respuesta = {
            error: false, 
            data: '',
            codigo: 200, 
            mensaje: 'ok'
        };
        res.status(200).json(respuesta)
    } catch(error) {
        respuesta = {
          error: true, 
          data: '',
          codigo: 500, 
          mensaje: error
         };
          console.log(respuesta);
          return res.status(500).json(respuesta);
      }   

}

async function buscarTodosUsuarios(req,res) {
    /*Rescata todos los usuarios Administrador y Laboratorio*/
    try {
        query={'usuarioLaboratorioCliente.laboratorioCliente_tipoEmpresa':{$in:['Administrador','Laboratorio']},estado: {$ne:'Borrado'}};
        
        const usuarios = await usuario.find(query).sort('apellidoPaterno');
        respuesta = {
            error: false, 
            data: usuarios,
            codigo: 200, 
            mensaje: 'ok'
        };
        return res.status(200).json(respuesta);
    } catch(error) {
        respuesta = {
          error: true, 
          data: '',
          codigo: 500, 
          mensaje: error
         };
        console.log(respuesta);
        return res.status(500).json(respuesta);
      }   
}

async function buscarTodosUsuariosEmpresa(req,res) {
    try {
        /*Rescata todos los usuarios por empresa y tipo empresa*/
        let clientes;
        let arr=[];
        arr.push(req.params.empresaId)
        if (req.params.tipoEmpresa==="Laboratorio"){
            query={'empresa.empresa_Id':req.params.empresaId};
            clientes = await cliente.find(query).sort('razonSocial');
            for (a = 0; a < clientes.length; a++) {
                arr.push(clientes[a]._id.toString());
            }
        }
        console.log('clientes:',arr);

        query={'usuarioLaboratorioCliente.laboratorioCliente_Id':{$in:arr},estado: {$ne:'Borrado'}}; //'usuarioLaboratorioCliente.laboratorioCliente_tipoEmpresa':req.params.tipoEmpresa
        console.log('usuario todo:',query);
        const usuarios = await usuario.find(query).sort('apellidoPaterno');
        respuesta = {
            error: false, 
            data: usuarios,
            codigo: 200, 
            mensaje: 'ok'
        };
        return res.status(200).json(respuesta);
    } catch(error) {
        respuesta = {
          error: true, 
          data: '',
          codigo: 500, 
          mensaje: error
         };
        console.log(respuesta);
        return res.status(500).json(respuesta);
      }   
}

async function buscarTodosUsuariosEmpresaLaboratorio(req,res) {
    try {
        
        query={'usuarioLaboratorioCliente.laboratorioCliente_Id':req.params.empresaId,estado: {$ne:'Borrado'}};
        console.log('usuario todo Doctor2:',query);
        const usuarios = await usuario.find(query).sort('apellidoPaterno');
        respuesta = {
            error: false, 
            data: usuarios,
            codigo: 200, 
            mensaje: 'ok'
        };
        return res.status(200).json(respuesta);
    } catch(error) {
        respuesta = {
          error: true, 
          data: '',
          codigo: 500, 
          mensaje: error
         };
        console.log(respuesta);
        return res.status(500).json(respuesta);
      }   
}
 // next pasa a la siguiente función
async function buscaId(req,res,next){
    try {
        console.log('pasoIDusuario')
        let query={};
        query={_id: req.params.id, estado: {$ne:'Borrado'}};
        const usuarios = await usuario.find(query)
        if(!usuarios.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.usuarios=usuarios;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

async function buscaUsuario(req,res,next){
    try {
        let query={};
        query={usuario: req.params.usuario, estado: {$ne:'Borrado'}, estadoUsuario: {$ne:'Inactivo'}};
        const usuarios = await usuario.find(query)
        console.log('usuario:',usuarios);
        if(!usuarios.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.usuarios=usuarios;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    crearUsuario, actualizarUsuario,actualizarUsuarioContrasena,actualizarUsuarioContrasenaReset,reseteaUsuarioContrasena,buscarUsuario,eliminarUsuario,buscarTodosUsuarios,buscarTodosUsuariosEmpresa,buscarTodosUsuariosEmpresaLaboratorio,buscarUsuarioPermiso,buscaId,buscaUsuario
}