const especie = require('../modelos/especie.modelo');
const raza = require('../modelos/raza.modelo');


async function crearEspecie(req,res) {
//console.log('pro: ',req.body)    
    if(req.body.especies){             // Si trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'Ya existe'
           };
        console.log('especie encuentra:',req.body.especies);
        return res.status(200).json(respuesta);
    }
    try {
      //  console.log('agrega', req.body)
        const especie_resp = await new especie(req.body).save()
    
        respuesta = {
            error: false, 
            data: especie_resp,
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

async function actualizarEspecie(req,res) {

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

    if(!req.body.especies){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro la Especie'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let especie_actualiza = req.body.especies[0];
        
        especie_actualiza = Object.assign(especie_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        
        // queryModifica={usuarioModifica_id: '', estado:'Borrado'};
         await especie.updateOne({_id: req.params.id},especie_actualiza) 

         
       //   console.log('datos especie:',req.params)
       //   console.log('empresa:',req.body.especies[0].empresa_Id)
           await raza.updateMany( {empresa_Id :req.body.especies[0].empresa_Id,especieNombre: req.params.nombreEspecieAnterior}, 
            {$set:{especieNombre:req.body.especies[0].nombre}} );
            
/*
            query={empresa_Id:"62df0fe82843bc4f9ca6e334",especieNombre:"Felino",estado: {$ne:'Borrado'}};
        const razaBusca = await raza.find(query).sort();

          
            for (var i = 0; i < razaBusca.length; i++) {
                await raza.updateMany( {empresa_Id :req.body.especies[0].empresa_Id,nombre: razaBusca[i].nombre}, 
                    {$set:{especieNombre:razaBusca[i].especieNombre}} );
            }
            */
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

function buscarEspecie(req,res) {
   
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

    if(req.body.especies){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.especies,
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
        mensaje: 'No encontró la Especie'
    };
    return res.status(200).json(respuesta);
}

async function eliminarEspecie(req,res) {

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

    if(!req.body.especies){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro la Especie'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        queryModifica={usuarioModifica_id: req.params.idUsu, estado:'Borrado'};
        await especie.updateOne({_id: req.params.id},queryModifica) 
        
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

async function buscarTodosEspecie(req,res) {
    try {
        query={empresa_Id:req.params.empresaId,estado: {$ne:'Borrado'}};
        const especies = await especie.find(query).sort('nombre');
        respuesta = {
            error: false, 
            data: especies,
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
        console.log('busca id: ',req.params);
        let query={};
        query={_id: req.params.id, estado: {$ne:'Borrado'}};
        const especies = await especie.find(query)
        if(!especies.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.especies=especies;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    crearEspecie,actualizarEspecie,buscarEspecie,eliminarEspecie,buscarTodosEspecie,buscaId
}