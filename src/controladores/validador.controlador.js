const validador = require('../modelos/validador.modelo');

async function crearValidador(req,res) {
    if(req.body.validadores){             // Si trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'Validador Ya Existe'
           };
            console.log(respuesta);
            return res.status(200).json(respuesta);
    }
    try {
        console.log('agrega', req.body)
        const validador_resp = await new validador(req.body).save()
    
        respuesta = {
            error: false, 
            data: validador_resp,
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

async function actualizarValidador(req,res) {

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

    if(!req.body.validadores){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Validador'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let validador_actualiza = req.body.validadores[0];
        
        validador_actualiza = Object.assign(validador_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto

         await validador.updateOne({_id: req.params.id},validador_actualiza) 

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

function buscarValidador(req,res) {
   
    if(req.body.error){ // Si biene un error de la busueda anterior
        
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
        };
        return res.status(500).json(respuesta);
    }

    if(req.body.validadores){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.validadores,
            codigo: 200, 
            mensaje: 'ok'
        };
     //   console.log('paso 2',respuesta);
        return res.status(200).json(respuesta);
    }
   //si no encontro registros
    respuesta = {
        error: false, 
        data: '',
        codigo: 404, 
        mensaje: 'No encontró el Validador'
    };
    console.log('paso 3',respuesta);
    return res.status(200).json(respuesta);
}

async function eliminarValidador(req,res) {

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

    if(!req.body.validadores){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Validador'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        queryModifica={usuarioModifica_id: '', estado:'Borrado'};
        await validador.updateOne({_id: req.params.id},queryModifica) 
        
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

async function buscarTodosValidador(req,res) {
    try {
        query={empresa_Id:req.params.empresaId,estado: {$ne:'Borrado'}};
        const validadores = await validador.find(query).sort('apellidoPaterno');
        console.log('validadores 1:', validadores);
        respuesta = {
            error: false, 
            data: validadores,
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
async function buscaRut(req,res,next){
    console.log("Datos llegada busca rut:", req.body)
    const newValidador = {
        rutValidador: req.body.rutValidador,
        empresa_Id: req.body.rutValidador
    }
    try {
        let query={};
        query={rutValidador:newValidador.rutValidador, empresa_Id: newValidador.empresa_Id, estado: {$ne:'Borrado'}};
        console.log(query);
        const validadores = await validador.find(query)
    
        if(!validadores.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.validadores=validadores;  // si tiene datos los guarda y pasa a la siguiente funcion
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
        const validadores = await validador.find(query)
        if(!validadores.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.validadores=validadores;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    crearValidador,actualizarValidador,buscarValidador,eliminarValidador,buscarTodosValidador,buscaRut,buscaId
}