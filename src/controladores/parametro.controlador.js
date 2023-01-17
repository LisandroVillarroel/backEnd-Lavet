const parametro = require('../modelos/parametro.modelo');

async function crearParametro(req,res) {
    if(req.body.parametros){             // Si trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'Parametro Ya existe'
           };
        console.log(respuesta);
        return res.status(200).json(respuesta);
    }
    try {
        console.log('agrega', req.body)
        const parametro_resp = await new parametro(req.body).save()
    
        respuesta = {
            error: false, 
            data: parametro_resp,
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

async function actualizarParametro(req,res) {

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

    if(!req.body.parametros){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Parámetro'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let parametro_actualiza = req.body.parametros[0];
        
        parametro_actualiza = Object.assign(parametro_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
  
        
        // queryModifica={usuarioModifica_id: '', estado:'Borrado'};
         await parametro.updateOne({_id: req.params.id},parametro_actualiza) 

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

function buscarParametro(req,res) {
   
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

    if(req.body.parametros){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.parametros,
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
        mensaje: 'No encontró el Paámetro'
    };
    return res.status(200).json(respuesta);
}

async function eliminarParametro(req,res) {

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

    if(!req.body.parametros){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Parametro'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        queryModifica={usuarioModifica_id: '', estado:'Borrado'};
        await parametro.updateOne({_id: req.params.id},queryModifica) 
        
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

async function buscarTodosParametro(req,res) {
    try {
        query={empresa_Id:req.params.empresaId, estado: {$ne:'Borrado'}};
        const parametros = await parametro.find(query).sort('numeroFicha');
        respuesta = {
            error: false, 
            data: parametros,
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

async function buscarParametroLetra(req,res) {
    try {
        query={ letra:req.params.letra, estado: {$ne:'Borrado'}};
        console.log('letra:',query);
        const parametros = await parametro.find(query).sort();
        respuesta = {
            error: false, 
            data: parametros,
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

 // next pasa a la siguiente función
async function buscaId(req,res,next){
    try {
        let query={};
        query={_id: req.params.id, estado: {$ne:'Borrado'}};
        const parametros = await parametro.find(query)
        if(!parametros.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.parametros=parametros;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    crearParametro,actualizarParametro,buscarParametro,eliminarParametro,buscarTodosParametro,buscarParametroLetra,buscaId
}