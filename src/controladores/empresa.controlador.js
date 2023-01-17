const empresa = require('../modelos/empresa.modelo');

async function crearEmpresa(req,res) {
    if(req.body.empresas){             // Si trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'Empresa Ya Existe'
           };
            console.log(respuesta);
            return res.status(200).json(respuesta);
    }
    try {
        console.log('agrega', req.body)
        const empresa_resp = await new empresa(req.body).save()
    
        respuesta = {
            error: false, 
            data: empresa_resp,
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

async function actualizarEmpresa(req,res) {

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

    if(!req.body.empresas){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro la Empresa'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let empresa_actualiza = req.body.empresas[0];
        
        empresa_actualiza = Object.assign(empresa_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        // const empresa_resp = empresa.save(empresa_actualiza);
        
        // queryModifica={usuarioModifica_id: '', estado:'Borrado'};
         await empresa.updateOne({_id: req.params.id},empresa_actualiza) 

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

function buscarEmpresa(req,res) {
   
    if(req.body.error){ // Si biene un error de la busueda anterior
        
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
        };
        return res.status(500).json(respuesta);
    }

    if(req.body.empresas){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.empresas,
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
        mensaje: 'No encontró la Empresa'
    };
    console.log('paso 3',respuesta);
    return res.status(200).json(respuesta);
}

async function eliminarEmpresa(req,res) {

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

    if(!req.body.empresas){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro la Empresa'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        queryModifica={usuarioModifica_id: '', estado:'Borrado'};
        await empresa.updateOne({_id: req.params.id},queryModifica) 
        
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

async function buscarTodosEmpresaListado(req,res) {
    try {
        query={_id:{$all:[req.params.listaEmp]},estado: {$ne:'Borrado'}};
        const empresas = await empresa.find(query).sort('razonSocial');
        console.log('empresas 1:', empresas);
        respuesta = {
            error: false, 
            data: empresas,
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

async function buscarTodosEmpresa(req,res) {
    try {
        query={estado: {$ne:'Borrado'}};
        const empresas = await empresa.find(query).sort('razonSocial');
        console.log('empresas 1:', empresas);
        respuesta = {
            error: false, 
            data: empresas,
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
    const newEmpresa = {
        rutEmpresa: req.body.rutEmpresa
    }
    try {
        let query={};
        query={rutEmpresa:newEmpresa.rutEmpresa, estado: {$ne:'Borrado'}};
        console.log(query);
        const empresas = await empresa.find(query)
    
        if(!empresas.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.empresas=empresas;  // si tiene datos los guarda y pasa a la siguiente funcion
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
        const empresas = await empresa.find(query)
        if(!empresas.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.empresas=empresas;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    crearEmpresa,actualizarEmpresa,buscarEmpresa,eliminarEmpresa,buscarTodosEmpresaListado,buscarTodosEmpresa,buscaRut,buscaId
}