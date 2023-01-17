const examenFicha = require('../modelos/examenFicha.modelo');

async function crearExamenFicha(req,res) {
console.log('proooooo: ',req.body)    
    if(req.body.examenFichas){             // Si trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'Exámen Ya existe'
           };
        console.log(respuesta);
        return res.status(200).json(respuesta);
    }
    try {
        console.log('agrega', req.body)
        const examenFicha_resp = await new examenFicha(req.body).save()
        console.log('MODIFICA INCRE', examenFicha_resp)
        await examenFicha.updateOne({_id: examenFicha_resp.id}, { $inc: { quantity: 1}})

        respuesta = {
            error: false, 
            data: examenFicha_resp,
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

async function actualizarExamenFicha(req,res) {

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

    if(!req.body.examenFichas){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Exámen Ficha'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let examenFicha_actualiza = req.body.examenFicha[0];
        
        examenFicha_actualiza = Object.assign(examenFicha_actualiza,req.body);  // Object.assign( Asigna todas las variables y examen ficha, devuelve el Objeto
        
        // queryModifica={usuarioModifica_id: '', estado:'Borrado'};
         await examenFicha.updateOne({_id: req.params.id},examenFicha_actualiza) 

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

function buscarExamenFicha(req,res) {
   
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

    if(req.body.examenFichas){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.examenFichas,
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
        mensaje: 'No encontró el Exámen Ficha'
    };
    return res.status(200).json(respuesta);
}

async function eliminarExamenFicha(req,res) {

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

    if(!req.body.examenFichas){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro Exámen Ficha'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        queryModifica={usuarioModifica_id: '', estado:'Borrado'};
        await examenFicha.updateOne({_id: req.params.id},queryModifica) 
        
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

async function buscarTodosExamenFicha(req,res) {
    try {
        query={estado: {$ne:'Borrado'}};
        const examenFichas = await examenFicha.find(query).sort('nombreCompleto');
        respuesta = {
            error: false, 
            data: examenFichas,
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
//next pasa a la siguiente función

 // next pasa a la siguiente función
async function buscaId(req,res,next){
    try {
        let query={};
        query={_id: req.params.id, estado: {$ne:'Borrado'}};
        const examenFichas = await examenFicha.find(query)
        if(!examenFichas.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.examenFichas=examenFichas;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    crearExamenFicha,actualizarExamenFicha,buscarExamenFicha,eliminarExamenFicha,buscarTodosExamenFicha,buscaId
}