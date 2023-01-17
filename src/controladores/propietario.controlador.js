const propietario = require('../modelos/propietario.modelo');

async function crearPropietario(req,res) {
console.log('pro: ',req.body)    
    if(req.body.propietarios){             // Si trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'Rut Ya existe'
           };
        console.log(respuesta);
        return res.status(200).json(respuesta);
    }
    try {
        console.log('agrega', req.body)
        const propietario_resp = await new propietario(req.body).save()
    
        respuesta = {
            error: false, 
            data: propietario_resp,
            codigo: 200, 
            mensaje: 'ok'
        };
        console.log(respuesta);
        res.status(200).json(respuesta)
    } catch(error) {
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: error
        };
        console.log(respuesta);
        return res.status(200).json(respuesta);
    }   
}

async function actualizarPropietario(req,res) {

    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
           };
            console.log(respuesta);
            return res.status(200).json(respuesta);
    }

    if(!req.body.propietarios){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Propietario'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let propietario_actualiza = req.body.propietarios[0];
        
        propietario_actualiza = Object.assign(propietario_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        
        // queryModifica={usuarioModifica_id: '', estado:'Borrado'};
         await propietario.updateOne({_id: req.params.id},propietario_actualiza) 

        respuesta = {
            error: false, 
            data: '',
            codigo: 200, 
            mensaje: 'ok'
        };
        console.log(respuesta);
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

function buscarPropietario(req,res) {
   
    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
        };
        console.log(respuesta);
        return res.status(200).json(respuesta);
    }

    if(req.body.propietarios){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.propietarios,
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
        mensaje: 'No encontró el Propietario'
    };
    return res.status(200).json(respuesta);
}

async function eliminarPropietario(req,res) {

    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
           };
            console.log(respuesta);
            return res.status(200).json(respuesta);
    }

    if(!req.body.propietarios){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Propietario'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        queryModifica={usuarioModifica_id: '', estado:'Borrado'};
        await propietario.updateOne({_id: req.params.id},queryModifica) 
        
        respuesta = {
            error: false, 
            data: '',
            codigo: 200, 
            mensaje: 'ok'
        };
        console.log(respuesta);
        res.status(200).json(respuesta)
    } catch(error) {
        respuesta = {
          error: true, 
          data: '',
          codigo: 500, 
          mensaje: error
         };
          console.log(respuesta);
          return res.status(200).json(respuesta);
      }   

}

async function buscarTodosPropietario(req,res) {
    try {
        query={estado: {$ne:'Borrado'}};
        const propietarios = await propietario.find(query).sort('apellidoPaterno');
        respuesta = {
            error: false, 
            data: propietarios,
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
        return res.status(200).json(respuesta);
      }   
}
async function buscarRut(req,res) {
    try {
        query={rutPropietario:req.params.rutPropietario, estado: {$ne:'Borrado'}};
        const propietarios = await propietario.find(query).sort();
        respuesta = {
            error: false, 
            data: propietarios,
            codigo: 200, 
            mensaje: 'ok'
        };
        return res.status(200).json(respuesta);
    } catch(error) {
        respuesta = {
          error: true, 
          data: '',
          codigo: error.codigo, 
          mensaje: error
         };
        console.log(respuesta);
        return res.status(500).json(respuesta);
      }      
}

 // next pasa a la siguiente función
async function buscaId(req,res,next){
    try {
        let query={};
        query={_id: req.params.id, estado: {$ne:'Borrado'}};
        const propietarios = await propietario.find(query)
        if(!propietarios.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.propietarios=propietarios;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    crearPropietario,actualizarPropietario,buscarPropietario,eliminarPropietario,buscarTodosPropietario,buscarRut,buscaId
}