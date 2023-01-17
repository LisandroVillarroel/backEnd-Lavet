const acceso = require('../modelos/acceso.modelo');

async function crearAcceso(req,res) {
    if(req.body.accesos){             // Si trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'Acceso Ya existe'
           };
            console.log(respuesta);
            return res.status(400).json(respuesta);
    }
    try {
        console.log('agrega', req.body)
        const acceso_resp = await new acceso(req.body).save()
    
        respuesta = {
            error: false, 
            data: acceso_resp,
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
        return res.status(500).json(respuesta);
    }   
}

async function actualizarAcceso(req,res) {

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

    if(!req.body.accesos){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Acceso'
           };
            return res.status(404).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let acceso_actualiza = req.body.accesos[0];
        acceso_actualiza = Object.assign(acceso_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        await acceso.updateOne({_id: req.params.id},acceso_actualiza) 
        
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

function buscarAcceso(req,res) {
   
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

    if(req.body.accesos){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.accesos,
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
        mensaje: 'No encontró el Acceso'
    };
    return res.status(404).json(respuesta);
}

async function eliminarAcceso(req,res) {

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

    if(!req.body.accesos){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Acceso'
           };
            return res.status(404).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        queryModifica={usuarioModifica_id: req.params.idUsu, estado:'Borrado'};
        await acceso.updateOne({_id: req.params.id},queryModifica) 
        
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
          return res.status(500).json(respuesta);
      }   

}

async function buscarTodosAcceso(req,res) {
    try {
        
        query={empresa_id:req.params.empresa_id, estado: {$ne:'Borrado'}};
        console.log('emp2', query);
        const accesos = await acceso.find(query).sort('nombreModulo');
        respuesta = {
            error: false, 
            data: accesos,
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
//next pasa a la siguiente función
async function buscaUrl(req,res,next){
    const paramAcceso = {
        empresa_id: req.body.empresa_id,
        url: req.body.url
    }

    try {
        let query={};
        query={empresa_id:paramAcceso.empresa_id, url:paramAcceso.url, estado: {$ne:'Borrado'}};
        console.log(query);
        const accesos = await acceso.find(query)
    
        if(!accesos.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.accesos=accesos;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}


 // next pasa a la siguiente función
async function buscaId(req,res,next){
    try {
        let query={};
        query={_id: req.params.id, estado: {$ne:'Borrado'}};
        const accesos = await acceso.find(query)
        if(!accesos.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.accesos=accesos;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    crearAcceso,actualizarAcceso,buscarAcceso,eliminarAcceso,buscarTodosAcceso,buscaUrl,buscaId
}