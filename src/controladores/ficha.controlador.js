const ficha = require('../modelos/ficha.modelo');
const empresa = require('../modelos/empresa.modelo');
const cliente = require('../modelos/cliente.modelo');
const parametro = require('../modelos/parametro.modelo');
const propietario = require('../modelos/propietario.modelo'); 

const mailer = require('./../template/envioCorreoSendGrid')
const mailerClienteFinal = require('../template/envioCorreoClienteFinalSendGrid')
const mailerRecepcionSolicitudEmpresa = require('./../template/envioCorreoRecepcionSolicitudEmpresaSendGrid')

var ISODate = require('isodate');
//const moment = require('moment');
var moment = require('moment-timezone');

async function crearPropietario(req,res,next) {
    console.log('pasoooo Propietario:',req.body);
    if(req.body.fichaC.rutPropietario===''){             // Si trae información de la búsqueda anterior
        return next();
    }
    try {
        const newPropietario = {
            rutPropietario:  req.body.fichaC.rutPropietario,
            nombres: req.body.fichaC.nombrePropietario,
            apellidoPaterno: '.',
            apellidoMaterno: '.',
            region:0,
            comuna: 0,
            direccion: '.',
            telefono: 0,
            email: '.',
            usuarioCrea_id: req.body.usuarioCrea_id,
            usuarioModifica_id: req.body.usuarioModifica_id
        }

        let query={};
        query={rutPropietario: req.body.fichaC.rutPropietario, estado: {$ne:'Borrado'}};
        const fichasPropietario = await propietario.find(query)
        console.log('fichasPropietario',newPropietario)
        if(!fichasPropietario.length){ 
            console.log('graba')
             await new propietario(newPropietario).save();
        }

        return next();

    } catch(error) {
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: error
        };
        return res.status(500).json(respuesta);
    }
}

async function crearFicha(req,res) {
//  console.log('pasoooo:',req.body);
    if(req.body.fichas){             // Si trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'Ya existe'
           };
    //    console.log(respuesta);
        return res.status(200).json(respuesta);
    }
    try {
        let parametroEmp= parametro;
        const fechaIngreso=new Date();

        req.body.seguimientoEstado.fechaHora_ingresado_crea=fechaIngreso;
        req.body.seguimientoEstado.fechaHora_ingresado_modifica=fechaIngreso;
        req.body.seguimientoEstado.fechaHora_recepcionado_crea=fechaIngreso;
      //  console.log('correlativo:',req.params.numCorrelativo);
        console.log('paso1');
        console.log('req.params.numCorrelativo:',req.params.numCorrelativo)
        console.log('req.body.empresa.empresa_Id:',req.body.empresa.empresa_Id)
        if (req.params.numCorrelativo==='1'){  // El 0 indica que es la primera vez que entra
        //    console.log('paso1');
            parametroEmp= await parametro.findOneAndUpdate({empresa_id:  req.body.empresa.empresa_Id},{ $inc: { numeroFicha:+1}}, {new: true})//  {new: true}  devuelve el documento
        }else{
          //  console.log('paso2');
          //  query={'empresa_id':req.body.empresa.empresa_Id,estado: {$ne:'Borrado'}};
          //  parametroEmp= await parametro.find(query)//  {new: true}  devuelve el documento
          parametroEmp= await parametro.findOneAndUpdate({empresa_id:  req.body.empresa.empresa_Id},{ $inc: { numeroFicha:+0}}, {new: true})// mantiene el {new: true}  devuelve el documento
            
        }
        console.log('paso2');
        const ficha_resp = await new ficha(req.body).save();
        console.log('paso3');
       // console.log('parametro:',parametroEmp);
       // console.log('ficha_resp._id:',ficha_resp._id);
       // console.log('parametroEmp.letra:',parametroEmp.letra);
       // console.log('parametroEmp.numeroFicha:',parametroEmp.numeroFicha);
       // console.log('req.params.numCorrelativo:',req.params.numCorrelativo);
       // console.log('numero concatenado:',parametroEmp.letra+parametroEmp.numeroFicha+req.params.numCorrelativo);
        const update_resp = await ficha.updateOne({_id: ficha_resp._id},{  'fichaC.numeroFicha': parametroEmp.letra+parametroEmp.numeroFicha+req.params.numCorrelativo, 'fichaC.id_Ficha': parametroEmp.letra+parametroEmp.numeroFicha}, {new: true});
       // console.log('update:',update_resp);
        respuesta = {
            error: false, 
            data: ficha_resp,
            codigo: 200, 
            mensaje: 'ok'
        };
       
      //  console.log(respuesta);
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

async function envioCorreoSendGrid(req,res) {
    let mailOptions = {
        envioEmail:{
            emailEnvio: 'empresa_[0].envioEmail.emailEnvio',
            password: 'empresa_[0].envioEmail.password',
            nombreDesde: 'empresa_[0].envioEmail.nombreDesde',
            asunto: 'empresa_[0].envioEmail.asunto',
            tituloCuerpo: 'empresa_[0].envioEmail.tituloCuerpo',
            tituloCuerpoMedio: 'empresa_[0].envioEmail.tituloCuerpoMedio',
            tituloCuerpoPie: 'empresa_[0].envioEmail.tituloCuerpoPie'
        },
        correoRecepcionCliente: 'ficha_[0].fichaC.cliente.correoRecepcionCliente',
        rutEmpresa: 'empresa_[0].rutEmpresa',
        nombreExamen: 'ficha_[0].fichaC.examen.nombre',
        numFicha: 'ficha_[0].fichaC.numeroFicha'
      };
    mailer.enviar_mail(mailOptions, function (err,info) {
        if(err)
            {
                respuesta = {
                    error: true, 
                    data: '',
                    codigo: 500, 
                    mensaje: error
                };
                return res.status(500).json(respuesta);
            }
    }
    );
}


async function envioCorreo(req,res) {
    
    try {
        let query={};

        query={_id: req.params.ficha_id, estado: {$ne:'Borrado'}};
        const ficha_ = await ficha.find(query)

      //  console.log('ficha:',ficha_);
        query={_id: ficha_[0].empresa.empresa_Id, estado: {$ne:'Borrado'}};
        const empresa_ = await empresa.find(query)

     //   console.log('envia email empresa:',empresa_);
        if (empresa_!=null){
      //      console.log('paso email 1');
            console.log('paso email 111',empresa_[0]);
            let mailOptions = {
                envioEmail:{
                    emailEnvio: empresa_[0].envioEmail.emailEnvio,
                    password: empresa_[0].envioEmail.password,
                    nombreDesde: empresa_[0].envioEmail.nombreDesde,
                    asunto: empresa_[0].envioEmail.asunto,
                    tituloCuerpo: empresa_[0].envioEmail.tituloCuerpo,
                    tituloCuerpoMedio: empresa_[0].envioEmail.tituloCuerpoMedio,
                    tituloCuerpoPie: empresa_[0].envioEmail.tituloCuerpoPie
                },
                correoRecepcionCliente: ficha_[0].fichaC.cliente.correoRecepcionCliente,
                rutEmpresa: empresa_[0].rutEmpresa,
                nombreExamen: ficha_[0].fichaC.examen.nombre,
                numFicha: ficha_[0].fichaC.numeroFicha
              };
              console.log('paso email 2222',mailOptions);
            mailer.enviar_mail(mailOptions, function (err,info) {
                if(err)
                    {
                        respuesta = {
                            error: true, 
                            data: '',
                            codigo: 500, 
                            mensaje: error
                        };
                        return res.status(500).json(respuesta);
                    }
            }
            );
        }
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

async function envioCorreoClienteFinal(req,res) {
    
    try {
        let query={};

        query={_id: req.params.ficha_id, estado: {$ne:'Borrado'}};
        const ficha_ = await ficha.find(query)

      //  console.log('ficha:',ficha_);
        query={_id: ficha_[0].fichaC.cliente.idCliente, 'empresa.empresa_Id': ficha_[0].empresa.empresa_Id, estado: {$ne:'Borrado'}};
        const cliente_ = await cliente.find(query)

        if (cliente_!=null){
            console.log('paso email 1',cliente_[0]);
            let mailOptions = {
                envioEmail:{
                  //  emailEnvio: empresa_[0].envioEmail.emailEnvio,
                  //  password: empresa_[0].envioEmail.password,
                    nombreDesde: cliente_[0].empresa[0].envioEmail.nombreDesde,
                    asunto: cliente_[0].empresa[0].envioEmail.asunto,
                    tituloCuerpo: cliente_[0].empresa[0].envioEmail.tituloCuerpo,
                    tituloCuerpoMedio: cliente_[0].empresa[0].envioEmail.tituloCuerpoMedio,
                    tituloCuerpoPie: cliente_[0].empresa[0].envioEmail.tituloCuerpoPie
                },
                correoClienteFinal: ficha_[0].fichaC.correoClienteFinal,
                rutEmpresa: ficha_[0].empresa.rutEmpresa,
              //  rutEmpresa: cliente_[0].rutCliente,
                nombreExamen: ficha_[0].fichaC.examen.nombre,
                numFicha: ficha_[0].fichaC.numeroFicha
              };
              console.log('paso email 2',mailOptions);
              mailerClienteFinal.enviar_mail_cliente_Final(mailOptions, function (err,info) {
                if(err)
                    {
                        respuesta = {
                            error: true, 
                            data: '',
                            codigo: 500, 
                            mensaje: error
                        };
                        return res.status(500).json(respuesta);
                    }
            }
            );
        }
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

async function envioCorreoSolicitudCliente(req,res) {
    
    try {
        let query={};
        console.log('req.params.id:',req.params.id);
        query={_id: req.params.id, estado: {$ne:'Borrado'}};
        const ficha_ = await ficha.find(query)

        console.log('ficha_:',ficha_);
        console.log('ficha_[0].fichaC.numeroFicha:',ficha_[0].fichaC.id_Ficha);
        query={'fichaC.id_Ficha': ficha_[0].fichaC.id_Ficha, estado: {$ne:'Borrado'}};
        const fichaExamenes = await ficha.find(query)

        console.log('fichaExamenes:',fichaExamenes);
        query={_id: ficha_[0].empresa.empresa_Id, estado: {$ne:'Borrado'}};
        const empresa_ = await empresa.find(query)

        if (empresa_!=null){
            console.log('paso email 1',empresa_[0]);

            let examenesSolicitados_=[];
            let examen
            for (var i = 0; i < fichaExamenes.length; i++) { 
                console.log('examennnn:',fichaExamenes[i].fichaC.examen.nombre)
                examen={nombreExamen:fichaExamenes[i].fichaC.examen.nombre};
                examenesSolicitados_.push(examen);
            }

            let envioEmailRecepcionEmpresa={
                  
                    emailRecepcion: empresa_[0].correoRecepcionSolicitud,
                    rutCliente: ficha_[0].fichaC.cliente.rutCliente,
                    nombreFantasiaCliente: ficha_[0].fichaC.cliente.nombreFantasia,
                    numFicha: ficha_[0].fichaC.numeroFicha,
                    examenesSolicitados:examenesSolicitados_
                };
                
              console.log('envioEmailRecepcionEmpresa:',envioEmailRecepcionEmpresa);
              mailerRecepcionSolicitudEmpresa.enviar_mail_recepcion_Solicitud(envioEmailRecepcionEmpresa, function (err,info) {
                if(err)
                    {
                        respuesta = {
                            error: true, 
                            data: '',
                            codigo: 500, 
                            mensaje: error
                        };
                        return res.status(500).json(respuesta);
                    }
            }
            );
        }
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

async function descargaArchivo(req,res) {
   // console.log('pasoooo sube arch');
    
    try {
  

        respuesta = {
            error: false, 
            data: '',
            codigo: 200, 
            mensaje: 'okkkk2'
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

async function actualizarFicha(req,res) {

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

    if(!req.body.fichas){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro la Ficha'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let ficha_actualiza = req.body.fichas[0];
        console.log('body:',req.body)
       
        console.log('body:',req.body)

        let fechaActual= new Date();

        if (req.body.estadoFicha=='Ingresado' || req.body.estadoFicha=='Solicitado'){ // Pregunta si "Ingresado"  Laboratorio   o si "Solicitado" Veterinaria
            req.body.seguimientoEstado.fechaHora_ingresado_modifica= fechaActual;
            req.body.seguimientoEstado.fechaHora_recepcionado_modifica= fechaActual;
        }
        
        if (req.body.fichas[0].estadoFicha=='Solicitado'){  // Pregunta por la información Actual, antes que se modifique
            req.body.seguimientoEstado.fechaHora_recepcionado_crea= fechaActual;
            req.body.seguimientoEstado.fechaHora_recepcionado_modifica= fechaActual;
        }

        ficha_actualiza = Object.assign(ficha_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        
        // queryModifica={usuarioModifica_id: '', estado:'Borrado'};
        const ficha_resp =await ficha.updateOne({_id: req.params.id},ficha_actualiza) 

        respuesta = {
            error: false, 
            data: ficha_resp,
            codigo: 200, 
            mensaje: 'ok'
        };
       
        
     //   console.log('respuesta envia',);
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

async function actualizarFichaEnvia(req,res) {

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

    if(!req.body.fichas){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro la Ficha'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let ficha_actualiza = req.body.fichas[0];

        const fechaHora_envia_crea=new Date();

        req.body.seguimientoEstado.fechaHora_enviado=fechaHora_envia_crea;
        
        ficha_actualiza = Object.assign(ficha_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        
        // queryModifica={usuarioModifica_id: '', estado:'Borrado'};
        const ficha_resp =await ficha.updateOne({_id: req.params.id},ficha_actualiza) 

        respuesta = {
            error: false, 
            data: ficha_resp,
            codigo: 200, 
            mensaje: 'ok'
        };
       
        
     //   console.log('respuesta envia',);
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


async function actualizarFichaCorreoClienteFinal(req,res) {

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

    if(!req.body.fichas){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro la Ficha'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        await ficha.updateOne({_id: req.params.id},{$set:{'fichaC.correoClienteFinal':req.body.correoClienteFinal}}) 

        respuesta = {
            error: false, 
            data: ficha_resp,
            codigo: 200, 
            mensaje: 'ok'
        };
       
        
     //   console.log('respuesta envia',);
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


function buscarFicha(req,res) {
   
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

    if(req.body.fichas){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.fichas,
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
        mensaje: 'No encontró la Ficha'
    };
    return res.status(200).json(respuesta);
}

async function eliminarFicha(req,res) {

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

    if(!req.body.fichas){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro la Ficha'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
     //   console.log('antes de eliminar:',req.params.id)
      //  console.log('antes de eliminar2:',req.params.idUsu)
        
        queryModifica={usuarioModifica_id: req.params.idUsu, estado:'Borrado'};
        await ficha.updateOne({_id: req.params.id},queryModifica) 
        
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

async function buscarTodosFicha(req,res) {
    try {
        
      //  if (req.params.privilegio='Administrador'){
        console.log('tipo empresa:',req.params.tipoEmpresa)
        let arr = req.params.estadoFicha.split(','); 
        /*if (req.params.tipoEmpresa=='Veterinaria'){
            
            if (req.params.estadoFicha!='Todo'){
                query={'fichaC.cliente.idCliente':req.params.empresaOrigen,estadoFicha:{$in:arr},'ingresadoPor.tipoEmpresa':'Veterinaria',estado: {$ne:'Borrado'}};
            }else{
                query={'fichaC.cliente.idCliente':req.params.empresaOrigen,'ingresadoPor.tipoEmpresa':'Veterinaria',estado: {$ne:'Borrado'}};
            }
        }else{*/
            if (req.params.estadoFicha!='Todo'){
                if (req.params.tipoPermiso=='Administrador'){  //Permite ver si elpermiso es totalo solo especifico
                    query={'empresa.empresa_Id':req.params.empresaOrigen,estadoFicha:{$in:arr},estado: {$ne:'Borrado'}};
                }else{
                    query={'empresa.empresa_Id':req.params.empresaOrigen,estadoFicha:{$in:arr},'usuarioAsignado.idUsuario':req.params.idUsuarioAsignado,estado: {$ne:'Borrado'}};
                }
            }else{
                if (req.params.tipoPermiso=='Administrador'){//Permite ver si elpermiso es totalo solo especifico
                    query={'empresa.empresa_Id':req.params.empresaOrigen,estado: {$ne:'Borrado'}};
                }else{
                    query={'empresa.empresa_Id':req.params.empresaOrigen,'usuarioAsignado.idUsuario':req.params.idUsuarioAsignado,estado: {$ne:'Borrado'}};
                }
            }
            
        /*}*/
        console.log('query ficha:',query);
        const fichas = await ficha.find(query).sort('nombrePaciente');
        respuesta = {
            error: false, 
            data: fichas,
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

async function buscarTodosFichaPorFecha(req,res) {
    try {
        
      //  if (req.params.privilegio='Administrador'){
        console.log('tipo empresa:',req.params.tipoEmpresa)
      
       /* if (req.params.tipoEmpresa=='Veterinaria'){
   
            if (req.params.estadoFicha!='Todo'){
                query={'fichaC.cliente.idCliente':req.params.empresaOrigen,estadoFicha:req.params.estadoFicha,'ingresadoPor.tipoEmpresa':'Veterinaria',estado: {$ne:'Borrado'}};
            }else{
                query={'fichaC.cliente.idCliente':req.params.empresaOrigen,'ingresadoPor.tipoEmpresa':'Veterinaria',estado: {$ne:'Borrado'}};
            }
        }else{*/
            if (req.params.estadoFicha!='Todo'){
                let arr = req.params.estadoFicha.split(','); 
                if (req.params.tipoPermiso=='Administrador'){  //Permite ver si elpermiso es totalo solo especifico
                    query={'empresa.empresa_Id':req.params.empresaOrigen,estadoFicha:{$in:arr},
                    'seguimientoEstado.fechaHora_enviado': {$gte: ISODate(req.params.fechaInicio),$lte: ISODate(req.params.fechaFin) },
                    estado: {$ne:'Borrado'}};
                }else{
                    query={'empresa.empresa_Id':req.params.empresaOrigen,estadoFicha:{$in:arr},
                    'seguimientoEstado.fechaHora_enviado': {$gte: ISODate(req.params.fechaInicio),$lte: ISODate(req.params.fechaFin)},
                    'usuarioAsignado.idUsuario':req.params.idUsuarioAsignado,
                    estado: {$ne:'Borrado'}};
                }
            }else{
                if (req.params.tipoPermiso=='Administrador'){  //Permite ver si elpermiso es totalo solo especifico
                    query={'empresa.empresa_Id':req.params.empresaOrigen,
                    'seguimientoEstado.fechaHora_enviado': {$gte: ISODate(req.params.fechaInicio),$lte: ISODate(req.params.fechaFin)},
                    estado: {$ne:'Borrado'}};
                }else{
                    query={'empresa.empresa_Id':req.params.empresaOrigen,
                    'seguimientoEstado.fechaHora_enviado': {$gte: ISODate(req.params.fechaInicio),$lte: ISODate(req.params.fechaFin)},
                    'usuarioAsignado.idUsuario':req.params.idUsuarioAsignado,
                    estado: {$ne:'Borrado'}};
                }
            }
       /*}*/
        console.log('query ficha:',query);
        const fichas = await ficha.find(query).sort('nombrePaciente');
        respuesta = {
            error: false, 
            data: fichas,
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

async function buscarTodosFichaVet(req,res) {
    try {
        
      //  if (req.params.privilegio='Administrador'){
        let arr = req.params.estadoFicha.split(','); 
      
   
            if (req.params.estadoFicha!='Todo'){
                query={'fichaC.cliente.idCliente':req.params.empresaOrigen,estadoFicha:{$in:arr},estado: {$ne:'Borrado'}};
            }else{
                query={'fichaC.cliente.idCliente':req.params.empresaOrigen,estado: {$ne:'Borrado'}};
            }
        
        console.log('query ficha:',query);
        const fichas = await ficha.find(query).sort('nombrePaciente');
        respuesta = {
            error: false, 
            data: fichas,
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

async function buscarTodosFichaPorFechaVet(req,res) {
    try {
        
      //  if (req.params.privilegio='Administrador'){
        console.log('tipo estadoFicha:',req.params.estadoFicha)
        console.log('tipo estadoFicha:',req.params.fechaInicio)
        console.log('tipo estadoFicha:',req.params.fechaInicio)

            if (req.params.estadoFicha!='Todo'){
                query={'fichaC.cliente.idCliente':req.params.empresaOrigen,estadoFicha:req.params.estadoFicha,
                'seguimientoEstado.fechaHora_enviado': {
                    $gte: ISODate(req.params.fechaInicio),
                    $lte: ISODate(req.params.fechaFin)
                 },
                 estado: {$ne:'Borrado'}};

            }else{
                query={'fichaC.cliente.idCliente':req.params.empresaOrigen,
                'seguimientoEstado.fechaHora_enviado': {
                    $gte: ISODate(req.params.fechaInicio),
                    $lte: ISODate(req.params.fechaFin)
                 },
                 estado: {$ne:'Borrado'}};
            }

            console.log('query;',query)
        
        const fichas = await ficha.find(query).sort()
        console.log('fichas;',fichas)

        respuesta = {
            error: false, 
            data: fichas,
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

 // next pasa a la siguiente función
async function buscaId(req,res,next){
    try {
        let query={};
        query={_id: req.params.id, estado: {$ne:'Borrado'}};
        const fichas = await ficha.find(query)
        if(!fichas.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.fichas=fichas;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    envioCorreoSendGrid,crearPropietario,crearFicha,envioCorreo,envioCorreoClienteFinal,envioCorreoSolicitudCliente,actualizarFicha,actualizarFichaEnvia,actualizarFichaCorreoClienteFinal,buscarFicha,eliminarFicha,buscarTodosFicha,buscarTodosFichaPorFecha,buscarTodosFichaVet,buscarTodosFichaPorFechaVet,buscaId
}