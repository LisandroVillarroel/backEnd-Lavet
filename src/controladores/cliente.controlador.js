const cliente = require('../modelos/cliente.modelo');
const empresa = require('../modelos/empresa.modelo');
const { ObjectId } = require('mongodb');

async function crearCliente(req,res) {
    if(req.body.clientes){             // Si trae información de la búsqueda anterior
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
        const cliente_resp = await new cliente(req.body).save()
    
        respuesta = {
            error: false, 
            data: cliente_resp,
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

async function crearClienteEmpresa(req,res) {
    if(req.body.clientes){             // Si trae información de la búsqueda anterior
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
        console.log('agrega cliente empresa', req.body.empresa[0])
        const cliente_resp = await new cliente.empresa(req.body.empresa[0]).save()
    
        respuesta = {
            error: false, 
            data: cliente_resp,
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

async function actualizarCliente(req,res) {

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

    if(!req.body.clientes){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Cliente'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let cliente_actualiza = req.body.clientes[0];
        console.log('paso modifica:',req.body);
        cliente_actualiza = Object.assign(cliente_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        // const cliente_resp = cliente.save(cliente_actualiza);
        
        // queryModifica={usuarioModifica_id: '', estado:'Borrado'};
         await cliente.updateOne({_id: req.params.id},cliente_actualiza) 

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

async function buscaClientePorRut(req,res) {
    try {
        query={rutCliente:req.params.rutCliente, estado: {$ne:'Borrado'}};
        const clientes = await cliente.find(query).sort('razonSocial');
        respuesta = {
            error: false, 
            data: clientes,
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

function buscarCliente(req,res) {
   
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

    if(req.body.clientes){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.clientes,
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
        mensaje: 'No encontró el Cliente'
    };
    return res.status(200).json(respuesta);
}

async function eliminarCliente(req,res) {

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

    if(!req.body.clientes){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Cliente'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
       /* let cliente_actualiza = req.body.clientes[0];
        console.log('req.body',req.body);
        console.log('cliente_actualiza:',cliente_actualiza)
        console.log('req.params.id:',req.params.id);
       // queryModifica={'empresa.empresa_Id':,usuarioModifica_id: '', estado:'Borrado'};
        cliente_actualiza = Object.assign(cliente_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        await cliente.updateOne({_id: req.params.id},cliente_actualiza) 
        */

        const fechaActual= new Date();

        //wait cliente.update_One({'_id': req.params.id,'empresa.empresa_Id':req.params.empresa_Id},{$set:{'empresa.usuarioModifica_id':req.params.idUsu,'empresa.estado':'Borrado','empresa.fechaHora_modifica':fechaActual}}) 
console.log('req.params.empresa_Id:',req.params.empresa_Id );
console.log('id:',req.params.id)
        const objectId_=ObjectId(req.params.id);

        await cliente.updateOne( {"_id": objectId_} 
        , { $set:{"empresa.$[loc].estado":'Borrado' }}, 
        { arrayFilters: [{ "loc.empresa_Id": req.params.empresa_Id }] }     )
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

async function buscarEmpresasCliente(req,res) {

    // si encontro información reemplaza información
  try{ 

   // console.log('clientessss:',req.body.clientes[0].empresa)
  /*  let listaIdVeterinaria=[];
    for (const item of req.body.clientes[0].empresa) {  
        console.log(`Clientes item: ${JSON.stringify(item)}`)
        console.log(`Clientes2 item: ${item._id}`)
        listaIdVeterinaria.push(item.empresa_Id);
    }
    */
    //listaIdVeterinaria=listaIdVeterinaria.slice(0,-1)
    //console.log('cadena:',listaIdVeterinaria);

    //'_id': { $in: listaIdVeterinaria
    // }
 
    query={_id:req.params.id, 'empresa.estado':{$ne:'Borrado'},estado: {$ne:'Borrado'}};
    const clientes = await cliente.find(query).sort('razonSocial');
    let listaIdCliente=[];
    for (const item of clientes[0].empresa) {  
        listaIdCliente.push(item.empresa_Id);
    }

    const empresa_ = await empresa.find({
        '_id': { $in: listaIdCliente}
    });
console.log('resultado empresa:',empresa_)
    respuesta = {
        error: false, 
        data: empresa_,
        codigo: 200, 
        mensaje: 'ok'
    };
    console.log(respuesta);
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

async function buscarTodosCliente(req,res) {
    try {
        console.log(':req.params.empresaId:',req.params.empresaId)
        query={'empresa.empresa_Id':req.params.empresaId, 'empresa.estado':{$ne:'Borrado'},estado: {$ne:'Borrado'}};
        const clientes = await cliente.find(query).sort('razonSocial');
        console.log('buscarTodosCliente:',clientes);
        respuesta = {
            error: false, 
            data: clientes,
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
async function buscaRut(req,res,next){
    const newCliente = {
        rutCliente: req.body.rutCliente,
        razonSocial: req.body.razonSocial,
        nombreFantasia: req.body.nombreFantasia,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        empresa_Id:req.body.empresa_Id,
        nombreContacto: req.body.nombreContacto,
        usuarioCrea_id: req.body.usuarioCrea_id,
        usuarioModifica_id: req.body.usuarioModifica_id
    }
    try {
        let query={};
        query={rutCliente:newCliente.rutCliente, empresa_Id:newCliente.empresa_Id, estado: {$ne:'Borrado'}};
        console.log(query);
        const clientes = await cliente.find(query)
    
        if(!clientes.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.clientes=clientes;  // si tiene datos los guarda y pasa a la siguiente funcion
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
        const clientes = await cliente.find(query)
        if(!clientes.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.clientes=clientes;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    crearCliente,crearClienteEmpresa,actualizarCliente,buscarCliente,eliminarCliente,buscarEmpresasCliente,buscarTodosCliente,buscaClientePorRut,buscaRut,buscaId
}