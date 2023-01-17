const raza = require('../modelos/raza.modelo');

async function crearRaza(req,res) {
//console.log('pro: ',req.body)    
    if(req.body.razas){             // Si trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: req.body.razas,
            codigo: 404, 
            mensaje: 'Ya existe'
           };
        console.log('encuentra:',req.body.razas);
        return res.status(200).json(respuesta);
    }
    try {
       // console.log('agrega', req.body)
        const raza_resp = await new raza(req.body).save()
    
        respuesta = {
            error: false, 
            data: raza_resp,
            codigo: 200, 
            mensaje: 'ok'
        };
     //   console.log(respuesta);
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

async function crearRazaMasiva(req,res) {
   // console.log('pro Masivo: ',req.body)    
        if(req.body.razas){             // Si trae información de la búsqueda anterior
            respuesta = {       
                error: true, 
                data: req.body.razas,
                codigo: 404, 
                mensaje: 'Ya existe'
               };
            console.log('encuentra:',req.body.razas);
            return res.status(200).json(respuesta);
        }
        try {
           // console.log('agrega', req.body)
           let registro
           for (var i = 0; i < req.body.length; i++) {
                registro={
                    nombre: req.body[i].nombre,
                    especieNombre: req.body[i].especieNombre,
                    usuarioCrea_id: req.body[i].usuarioCrea_id,
                    usuarioModifica_id: req.body[i].usuarioModifica_id,
                    empresa_Id: req.body[i].empresa_Id
                }
          //  etc.tag.push(tag[i]);
            await new raza(registro).save()
            }
            // await new raza(req.body).save()
        
            respuesta = {
                error: false, 
                data: '',
                codigo: 200, 
                mensaje: 'ok'
            };
         //   console.log(respuesta);
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
async function actualizarRaza(req,res) {

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

    if(!req.body.razas){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro la Raza'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        console.log('actualiza raza:',req.body);
        let raza_actualiza = req.body.razas[0];
        
        raza_actualiza = Object.assign(raza_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        
        // queryModifica={usuarioModifica_id: '', estado:'Borrado'};
         await raza.updateOne({_id: req.params.id},raza_actualiza) 

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

function buscarRaza(req,res) {
   
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

    if(req.body.razas){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.razas,
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
        mensaje: 'No encontró la Raza'
    };
    return res.status(200).json(respuesta);
}

async function eliminarRaza(req,res) {

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

    if(!req.body.razas){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro la Raza'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        queryModifica={usuarioModifica_id: '', estado:'Borrado'};
        await raza.updateOne({_id: req.params.id},queryModifica) 
        
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

async function buscarTodosRaza(req,res) {
    try {
        query={empresa_Id:req.params.empresaId,estado: {$ne:'Borrado'}};
        const razas = await raza.find(query).sort( {
            "especieNombre" : (1),
            "nombre" : (1)
        });
        respuesta = {
            error: false, 
            data: razas,
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

async function buscarTodosRazaEspecie(req,res) {
    try {
        console.log('parametro raza especie:',req.params)
        query={empresa_Id:req.params.empresaId,especieNombre:req.params.nombreEspecie,estado: {$ne:'Borrado'}};
        const razas = await raza.find(query).sort( {
            "especieNombre" : (1),
            "nombre" : (1)
        });
        respuesta = {
            error: false, 
            data: razas,
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
async function buscaEspecieRaza(req,res,next){
  //  console.log('parametro:',req.body)
    try {
        let query={};
        query={'especieNombre':req.body.especieNombre, nombre:{ $regex: req.body.nombre, $options:'i' }, empresa_Id:req.body.empresa_Id, estado: {$ne:'Borrado'}};
      //  console.log(query);
        const razas = await raza.find(query)
    
        if(!razas.length) {
            
            return next(); // si no tiene datos pasa a la siguiente funcion
        }else{
            console.log('encontro query:',query);
            console.log('encontro dato:',razas);
        req.body.razas=razas;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
        }
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
        const razas = await raza.find(query)
        if(!razas.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.razas=razas;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    crearRaza,crearRazaMasiva,actualizarRaza,buscarRaza,eliminarRaza,buscaEspecieRaza,buscarTodosRaza,buscarTodosRazaEspecie,buscaId
}