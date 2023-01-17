const doctorSolicitante = require('../modelos/doctorSolicitante.modelo');
const cliente = require('../modelos/cliente.modelo');

async function crearDoctorSolicitante(req,res) {
console.log('pro: ',req.body)    
    if(req.body.doctorSolicitantes){             // Si trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'Ya existe'
           };
        console.log(respuesta);
        return res.status(200).json(respuesta);
    }
    try {
        console.log('agrega', req.body)
        const doctorSolicitante_resp = await new doctorSolicitante(req.body).save()
    
        respuesta = {
            error: false, 
            data: doctorSolicitante_resp,
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

async function actualizarDoctorSolicitante(req,res) {

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

    if(!req.body.doctorSolicitantes){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Doctor Solicitante'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let doctorSolicitante_actualiza = req.body.doctorSolicitantes[0];
        
        doctorSolicitante_actualiza = Object.assign(doctorSolicitante_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        
        // queryModifica={usuarioModifica_id: '', estado:'Borrado'};
         await doctorSolicitante.updateOne({_id: req.params.id},doctorSolicitante_actualiza) 

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

function buscarDoctorSolicitante(req,res) {
   
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

    if(req.body.doctorSolicitantes){  // si la función de busqueda encontro información
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
        mensaje: 'No encontró el Doctor Solicitante'
    };
    return res.status(200).json(respuesta);
}

async function eliminarDoctorSolicitante(req,res) {

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

    if(!req.body.doctorSolicitantes){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Doctor Solicitante'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        queryModifica={usuarioModifica_id: '', estado:'Borrado'};
        await doctorSolicitante.updateOne({_id: req.params.id},queryModifica) 
        
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

async function buscarTodosDoctorSolicitante(req,res) {
    try {
        console.log('empresaId:',req.params.empresaId)
        query={'empresa.empresa_Id':req.params.empresaId, 'empresa.estado':{$ne:'Borrado'},estado: {$ne:'Borrado'}};
        const clientes = await cliente.find(query).sort('razonSocial');
        let listaIdCliente=[];
        for (const item of clientes) {  
            listaIdCliente.push(item._id);
        }
        console.log('clientes:',listaIdCliente)
    
        query={'cliente.idCliente': { $in: listaIdCliente},estado: {$ne:'Borrado'}};
        const doctorSolicitantes = await doctorSolicitante.find(query).sort('nombre');
        respuesta = {
            error: false, 
            data: doctorSolicitantes,
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
 async function buscaClienteDoctor(req,res,next){
    try {
       // console.log('busca id cliente: ',req.params);
        let query={};
        query={'cliente.idCliente': req.params.idCliente, estado: {$ne:'Borrado'}};
       // console.log('query:',query)
        const doctorSolicitantes = await doctorSolicitante.find(query);
       // console.log('respuesta',doctorSolicitantes);
        respuesta = {
            error: false, 
            data: doctorSolicitantes,
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
        console.log('busca id: ',req);
        let query={};
        query={_id: req.params.id, estado: {$ne:'Borrado'}};
        const doctorSolicitantes = await doctorSolicitante.find(query)
        if(!doctorSolicitantes.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.doctorSolicitantes=doctorSolicitantes;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    crearDoctorSolicitante,actualizarDoctorSolicitante,buscarDoctorSolicitante,buscaClienteDoctor,eliminarDoctorSolicitante,buscarTodosDoctorSolicitante,buscaId
}