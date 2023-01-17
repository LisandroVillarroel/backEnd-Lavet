const ficha = require('../modelos/ficha.modelo');
const empresa = require('../modelos/empresa.modelo');
const cliente = require('../modelos/cliente.modelo');
const parametro = require('../modelos/parametro.modelo');
const propietario = require('../modelos/propietario.modelo'); 



var ISODate = require('isodate');
//const moment = require('moment');



async function actualizarFichaAFacturar(req,res) {
  let ficha_actualiza;
  // si encontro información reemplaza información
  try {
   
      for (a = 0; a < req.body.length; a++) {
        console.log('precio final:',req.body[a].fichaC.examen)
      //  ficha_actualiza=req.body[a];
      //  ficha_actualiza.facturacion.estadoFacturacion='AFacturacion'
      const fechaFactura=new Date(req.params.ano+'/'+req.params.mes+'/01'+' 00:00:00');
        await ficha.updateOne({_id: req.body[a]._id},{$set:{'facturacion.estadoFacturacion':'AFacturacion','facturacion.fechaFacturacion':fechaFactura,'fichaC.examen.precioValorFinal':req.body[a].fichaC.examen.precioValorFinal}}) 
      }
     
      
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

async function actualizarFichaNumFactura(req,res) {
  let ficha_actualiza;
  // si encontro información reemplaza información
  try {
    query={'empresa.empresa_Id':req.body.empresaOrigen,'facturacion.numFactura':req.body.numFactura,estado: {$ne:'Borrado'}};
    const fichas_Busca = await ficha.find(query).sort();
    console.log('ficha busca',fichas_Busca.length)
    if (fichas_Busca.length!=0){

      respuesta = {
        error: true, 
        data: '',
        codigo:400, 
        mensaje: "La Factura ya Existe"
       };
      res.status(200).json(respuesta)
    }else{
        console.log('pasoooooooo')
        query={'empresa.empresa_Id':req.body.empresaOrigen,'fichaC.cliente.idCliente':req.body.idCliente,'facturacion.estadoFacturacion':'AFacturacion','facturacion.fechaFacturacion': new Date(req.body.fechaFacturacion),estado: {$ne:'Borrado'}};
        console.log('dato:', query)

        const fichas = await ficha.find(query).sort();
        for (a = 0; a < fichas.length; a++) {
          await ficha.updateOne({_id:fichas[a]._id},{$set:{'facturacion.estadoFacturacion':'Facturado','facturacion.fechaAsignaFactura':req.body.fechaAsignaFactura,'facturacion.usuarioAsigna_id':req.body.usuarioAsigna_id,'facturacion.numFactura':req.body.numFactura}}) 
        }
        respuesta = {
          error: true, 
          data: '',
          codigo:200, 
          mensaje: ""
         };
        res.status(200).json(respuesta)
      }
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

async function actualizarFichaNumFacturaPagada(req,res) {

  try {
    query={'empresa.empresa_Id':req.body.empresaOrigen,'facturacion.numFactura':req.body.numFactura,estado: {$ne:'Borrado'}};
    console.log('query:',query);
    const fichas = await ficha.find(query).sort();
   console.log('ficha:',req.body);
        for (a = 0; a < fichas.length; a++) {
          await ficha.updateOne({_id:fichas[a]._id},{$set:{'facturacion.facturaPagada':req.body.facturaPagada,'facturacion.fechaPagoFacturacion': new Date()}}) 
        }
        respuesta = {
          error: true, 
          data: '',
          codigo:200, 
          mensaje: ""
         };
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

async function buscarTodosFacturaFicha(req,res) {
    try {
        
      //  if (req.params.privilegio='Administrador'){
        console.log('tipo empresa:',req.params.tipoEmpresa)
        console.log('tipo idCliente:',req.params.idCliente)
        console.log('tipo fechaInicial:',req.params.fechaInicio)

        let arr = req.params.estadoFichaFacturacion.split(','); 
       
        if (req.params.idCliente=='Todos'){
            query={'empresa.empresa_Id':req.params.empresaOrigen,'facturacion.estadoFacturacion':{$in:arr}, estadoFicha:'Enviado',estado: {$ne:'Borrado'}};
        }else{
          if (req.params.fechaInicio=='Todos'){
            query={'empresa.empresa_Id':req.params.empresaOrigen,'fichaC.cliente.idCliente':req.params.idCliente,'facturacion.estadoFacturacion':{$in:arr}, estadoFicha:'Enviado',estado: {$ne:'Borrado'}};
          }else{
            query={'empresa.empresa_Id':req.params.empresaOrigen,'fichaC.cliente.idCliente':req.params.idCliente,'facturacion.estadoFacturacion':{$in:arr}, estadoFicha:'Enviado',$and: [{fechaHora_crea: {$gte: new Date(req.params.fechaInicio)}},{fechaHora_crea: {$lt: new Date(req.params.fechaFin)}}],estado: {$ne:'Borrado'}};
          }
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

async function buscarFacturaPorEmpresaTotal(req,res) {
  let registro=[];
  try {
      
    //  if (req.params.privilegio='Administrador'){
      console.log('tipo empresa:',req.params.tipoEmpresa)
      let arr = req.params.estadoFichaFacturacion.split(','); 

      query={empresa_Id:req.params.empresaOrigen,estadoFacturacion:{$in:arr},estado: {$ne:'Borrado'}};

      const fichas = await ficha.aggregate([ 
        {
            $project:
            {
              ano: { $year: "$facturacion.fechaFacturacion" },
              mes: { $month: "$facturacion.fechaFacturacion" },
              numFactura: "$facturacion.numFactura",
              idCliente: "$fichaC.cliente.idCliente",
              rutCliente: "$fichaC.cliente.rutCliente",
              nombreFantasia: "$fichaC.cliente.nombreFantasia",
              empresa_Id:"$empresa.empresa_Id",
              estadoFacturacion:"$facturacion.estadoFacturacion",
              facturaPagada:"$facturacion.facturaPagada",
              precioValorFinal: "$fichaC.examen.precioValorFinal",
              estado:"$estado"
                
            }
        },
        { $match:query}, 
        { $group:{ _id:{"idCliente":"$idCliente","rutCliente":"$rutCliente","nombreFantasia":"$nombreFantasia","anoFechaFacturacion":"$ano","mesFechaFacturacion":"$mes","numFactura":"$numFactura","facturaPagada":"$facturaPagada"},
                "totalFactura" : { "$sum" : "$precioValorFinal"},
                "cantidadExamen" : {"$sum" : 1},
              }
            },
            { $sort: { "_id.nombreFantasia":1 } }
    ]);

    console.log('ficha fac:',fichas)
    for (a = 0; a < fichas.length; a++) {
      let facturaPagadaTrueFalse=false;
      if (fichas[a]._id.facturaPagada=="SI")
        facturaPagadaTrueFalse=true;

      nuevoObjeto={
          "empresa_Id":req.params.empresaOrigen,
          "idCliente":fichas[a]._id.idCliente,
          "rutCliente":fichas[a]._id.rutCliente,
          "nombreFantasia":fichas[a]._id.nombreFantasia,
          "fechaFacturacion":fichas[a]._id.anoFechaFacturacion+'-'+fichas[a]._id.mesFechaFacturacion+'-01',
          "numFactura": fichas[a]._id.numFactura,
          "facturaPagada": facturaPagadaTrueFalse,
          "totalFactura":fichas[a].totalFactura,
          "cantidadExamen":fichas[a].cantidadExamen
      }
      registro.push(nuevoObjeto);
    
    }
    console.log('registro:',registro)
      respuesta = {
          error: false, 
          data: registro,
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

async function buscarFacturaPorEmpresaTotalFacturado(req,res) {
  let registro=[];
  try {
    console.log('req.params.fecha:',req.params.fecha);
    console.log('req.params.fechaHasta:',req.params.fechaHasta);
    //  if (req.params.privilegio='Administrador'){
      const ano_= new Date(req.params.fecha).getFullYear();
      const mes_= new Date(req.params.fecha).getMonth()+1;
      const anoMesDesde=parseInt(ano_.toString()+mes_.toString().padStart(2, 0));

      console.log('ano:',ano_);
      console.log('mes:',mes_);
      console.log('anoMesDesde:',anoMesDesde);

      const anoHasta_= new Date(req.params.fechaHasta).getFullYear();
      const mesHasta_= new Date(req.params.fechaHasta).getMonth()+1;
      const anoMesHasta=parseInt(anoHasta_.toString()+mesHasta_.toString().padStart(2, 0));

      const facturaPagada_= req.params.facturaPagada;

      let arr = req.params.estadoFichaFacturacion.split(','); 
      
        
        console.log('anoMesHasta:',anoMesHasta);
          if(facturaPagada_=='SinDato'){
          //  query={empresa_Id:req.params.empresaOrigen,estadoFacturacion:{$in:arr},ano:ano_,mes:mes_,estado: {$ne:'Borrado'}};
            query={empresa_Id:req.params.empresaOrigen,estadoFacturacion:{$in:arr},$and: [{anoMes: {$gte: anoMesDesde}},{anoMes: {$lt: anoMesHasta}}],estado: {$ne:'Borrado'}};
          }else{
            //query={empresa_Id:req.params.empresaOrigen,estadoFacturacion:{$in:arr},ano:ano_,mes:mes_,facturaPagada:facturaPagada_,estado: {$ne:'Borrado'}};
            query={empresa_Id:req.params.empresaOrigen,estadoFacturacion:{$in:arr},$and: [{anoMes: {$gte: anoMesDesde}},{anoMes: {$lt: anoMesHasta}}],facturaPagada:facturaPagada_,estado: {$ne:'Borrado'}};
          }
          console.log('query:',query);
      const fichas = await ficha.aggregate([ 
        {
            $project:
            {
              ano: { $year: "$facturacion.fechaFacturacion" },
              mes: { $month: "$facturacion.fechaFacturacion" },
             
              anoMes: {$toInt:{ $concat:[{$toString:{$year: "$facturacion.fechaFacturacion"}} , {$substr:[ "$facturacion.fechaFacturacion",5,2]}] }},

              numFactura: "$facturacion.numFactura",
              idCliente: "$fichaC.cliente.idCliente",
              rutCliente: "$fichaC.cliente.rutCliente",
              nombreFantasia: "$fichaC.cliente.nombreFantasia",
              empresa_Id:"$empresa.empresa_Id",
              estadoFacturacion:"$facturacion.estadoFacturacion",
              facturaPagada:"$facturacion.facturaPagada",
              precioValorFinal: "$fichaC.examen.precioValorFinal",
              estado:"$estado"
                
            }
        },
        { $match:query}, 
        { $group:{ _id:{"idCliente":"$idCliente","rutCliente":"$rutCliente","nombreFantasia":"$nombreFantasia","anoFechaFacturacion":"$ano","mesFechaFacturacion":"$mes","numFactura":"$numFactura","facturaPagada":"$facturaPagada", "anoMes":"$anoMes"},
                "totalFactura" : { "$sum" : "$precioValorFinal"},
                "cantidadExamen" : {"$sum" : 1},
              }
            },
            { $sort: { "_id.nombreFantasia":1 } }
    ]);

    console.log('ficha fac:',fichas)
    for (a = 0; a < fichas.length; a++) {
      let facturaPagadaTrueFalse=false;
      if (fichas[a]._id.facturaPagada=="SI")
        facturaPagadaTrueFalse=true;

      nuevoObjeto={
          "empresa_Id":req.params.empresaOrigen,
          "idCliente":fichas[a]._id.idCliente,
          "rutCliente":fichas[a]._id.rutCliente,
          "nombreFantasia":fichas[a]._id.nombreFantasia,
          "fechaFacturacion":fichas[a]._id.anoFechaFacturacion+'-'+fichas[a]._id.mesFechaFacturacion+'-01',
          "numFactura": fichas[a]._id.numFactura,
          "facturaPagada": facturaPagadaTrueFalse,
          "totalFactura":fichas[a].totalFactura,
          "cantidadExamen":fichas[a].cantidadExamen
      }
      registro.push(nuevoObjeto);
    
    }
    console.log('registro:',registro)
      respuesta = {
          error: false, 
          data: registro,
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

async function buscarEmpresaFacturaFicha(req,res) {
  let registro=[];
  try {
      
    //  if (req.params.privilegio='Administrador'){
      console.log('tipo empresa:',req.params.tipoEmpresa)
      let arr = req.params.estadoFichaFacturacion.split(','); 

      query={empresa_Id:req.params.empresaOrigen,estadoFacturacion:{$in:arr}, estadoFicha:'Enviado',estado: {$ne:'Borrado'}};
      console.log('pendinete enviado',query)
      const fichas = await ficha.aggregate([ 
        {
            $project:
            {
              idCliente: "$fichaC.cliente.idCliente",
              rutCliente: "$fichaC.cliente.rutCliente",
              nombreFantasia: "$fichaC.cliente.nombreFantasia",
              empresa_Id:"$empresa.empresa_Id",
              estadoFicha:"$estadoFicha",
              estadoFacturacion:"$facturacion.estadoFacturacion",
              precioValorFinal: "$fichaC.examen.precioValorFinal",
              estado:"$estado"
                
            }
        },
        { $match:query}, 
        { $group:{ _id:{"idCliente":"$idCliente","rutCliente":"$rutCliente","nombreFantasia":"$nombreFantasia"},
                "totalFactura" : { "$sum" : "$precioValorFinal"},
                "cantidadExamen" : {"$sum" : 1},
              }
            },
            { $sort: { "_id.nombreFantasia":1 } }
    ]);

    for (a = 0; a < fichas.length; a++) {

      nuevoObjeto={
          "idCliente":fichas[a]._id.idCliente,
          "rutCliente":fichas[a]._id.rutCliente,
          "nombreFantasia":fichas[a]._id.nombreFantasia,
          "totalFactura":fichas[a].totalFactura,
          "cantidadExamen":fichas[a].cantidadExamen
      }
      registro.push(nuevoObjeto);
    
 }
      respuesta = {
          error: false, 
          data: registro,
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

async function buscarTodosFacturaFichaetalle(req,res) {
  try {
        
    //  if (req.params.privilegio='Administrador'){
      const fechaFactura=new Date(req.params.fechaFacturacion)
      console.log('tipo empresa:',req.params.tipoEmpresa)
      console.log('tipo idCliente:',req.params.idCliente)
      console.log('tipo fechaInicial:',fechaFactura)

      let arr = req.params.estadoFichaFacturacion.split(','); 


            
      query={'empresa.empresa_Id':req.params.empresaOrigen,'fichaC.cliente.idCliente':req.params.idCliente,'facturacion.estadoFacturacion':{$in:arr},'facturacion.fechaFacturacion': new Date(req.params.fechaFacturacion),estado: {$ne:'Borrado'}};



      console.log('query ficha:',query);
      const fichas = await ficha.find(query).sort('fichaC.id_Ficha');
      console.log('ficha:',fichas);
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

async function buscarTodosFacturaFichaetallePorFactura(req,res) {
  try {
        
    //  if (req.params.privilegio='Administrador'){
      const fechaFactura=new Date(req.params.fechaFacturacion)
      console.log('tipo empresa:',req.params.tipoEmpresa)
      console.log('tipo idCliente:',req.params.idCliente)
      console.log('tipo numFactura:',req.params.numFactura)

      let arr = req.params.estadoFichaFacturacion.split(','); 


            
      query={'empresa.empresa_Id':req.params.empresaOrigen,'fichaC.cliente.idCliente':req.params.idCliente,'facturacion.estadoFacturacion':{$in:arr},'facturacion.numFactura': req.params.numFactura,estado: {$ne:'Borrado'}};



      console.log('query ficha:',query);
      const fichas = await ficha.find(query).sort('fichaC.id_Ficha');
      console.log('ficha:',fichas);
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

module.exports = {
  actualizarFichaAFacturar,actualizarFichaNumFactura,actualizarFichaNumFacturaPagada,buscarTodosFacturaFicha,buscarEmpresaFacturaFicha,buscarFacturaPorEmpresaTotal,buscarFacturaPorEmpresaTotalFacturado,buscarTodosFacturaFichaetalle,buscarTodosFacturaFichaetallePorFactura
}