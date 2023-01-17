const ficha = require('../modelos/ficha.modelo');

async function buscaGeneralVentas(req,res) {
    try {
        console.log('req.params.idClienteVet:',req.params.idClienteVet)
        //Extrae Valor Precio Anual
        if (req.params.idClienteVet=='Todos'){
            query={ano:parseInt(req.params.ano),empresa_Id:req.params.idLaboratorio,
            estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }else{
            query={ano:parseInt(req.params.ano),empresa_Id:req.params.idLaboratorio,idCliente:req.params.idClienteVet,
                estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }
    //    const fichas = await ficha.find(query).sort('razonSocial');

    console.log('query:',query)

        const valorAnualGeneral = await ficha.aggregate([ 
            {
                $project:
                  {
                    ano: { $year: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    mes: { $month: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    empresa_Id:"$empresa.empresa_Id",
                    idCliente:"$fichaC.cliente.idCliente",
                    precioValorFinal: "$fichaC.examen.precioValorFinal",
                    estadoFicha:"$estadoFicha",
                    estado:"$estado"
                    
                  }
            },
            { $match:query}, 
            { $group:{ _id:{},"valorGeneralAnual" : {
                "$sum" : "$precioValorFinal"
            } } 
        }])

console.log('valorAnualGeneral:',valorAnualGeneral)
        // Extra valor mes 
        if (req.params.idClienteVet=='Todos'){
            query={ano:parseInt(req.params.ano),mes:parseInt(req.params.mes),empresa_Id:req.params.idLaboratorio,
            estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }else{
            query={ano:parseInt(req.params.ano),mes:parseInt(req.params.mes),empresa_Id:req.params.idLaboratorio,idCliente:req.params.idClienteVet,
            estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }
        
    
        const valGeneralMes = await ficha.aggregate(
        [
            {
            $project:
                {
                ano: { $year: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                mes: { $month: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                empresa_Id:"$empresa.empresa_Id",
                idCliente:"$fichaC.cliente.idCliente",
                precioValorFinal: "$fichaC.examen.precioValorFinal",
                estadoFicha:"$estadoFicha",
                estado:"$estado"
                }
            },
            { $match:query },
            { $group:{ _id:{},"valAnualGeneralMes" : {
                "$sum" : "$precioValorFinal"
            } } 
            }
        ],
        
        )

        let valorAnualGeneralTotal=0
        let valorAnualGeneralMesTotal=0

        if (valorAnualGeneral.length!=0 )
             valorAnualGeneralTotal=valorAnualGeneral[0].valorGeneralAnual

        if (valGeneralMes.length!=0 )
            valorAnualGeneralMesTotal=valGeneralMes[0].valAnualGeneralMes

        const fichas ={
            valorAnualGeneralTotal: valorAnualGeneralTotal,
            valorAnualGeneralMesTotal:valorAnualGeneralMesTotal
        }
        console.log('ficha:',fichas)
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
          codigo: error.codigo, 
          mensaje: error
         };
        console.log(respuesta);
        return res.status(500).json(respuesta);
      }      
}

async function buscaVentasComparativoAnterior(req,res) {
    try {

        let registro=[
            {
                "name":"Enero",
                "series":[
                {
                    "name":(parseInt(req.params.ano)-1).toString(),
                    "value":0
                },
                {
                    "name":req.params.ano,
                    "value":0
                },
                ]
            },
            {
                "name":"Febrero",
                "series":[
                {
                    "name":(parseInt(req.params.ano)-1).toString(),
                    "value":0
                },
                {
                    "name":req.params.ano,
                    "value":0
                },
                ]
            },
            {
                "name":"Marzo",
                "series":[
                {
                    "name":(parseInt(req.params.ano)-1).toString(),
                    "value":0
                },
                {
                    "name":req.params.ano,
                    "value":0
                },
                ]
            },
            {
                "name":"Abril",
                "series":[
                {
                    "name":(parseInt(req.params.ano)-1).toString(),
                    "value":0
                },
                {
                    "name":req.params.ano,
                    "value":0
                },
                ]
            },
            {
                "name":"Mayo",
                "series":[
                {
                    "name":(parseInt(req.params.ano)-1).toString(),
                    "value":0
                },
                {
                    "name":req.params.ano,
                    "value":0
                },
                ]
            },
            {
                "name":"Junio",
                "series":[
                {
                    "name":(parseInt(req.params.ano)-1).toString(),
                    "value":0
                },
                {
                    "name":req.params.ano,
                    "value":0
                },
                ]
            },
            {
                "name":"Julio",
                "series":[
                {
                    "name":(parseInt(req.params.ano)-1).toString(),
                    "value":0
                },
                {
                    "name":req.params.ano,
                    "value":0
                },
                ]
            },
            {
                "name":"Agosto",
                "series":[
                {
                    "name":(parseInt(req.params.ano)-1).toString(),
                    "value":0
                },
                {
                    "name":req.params.ano,
                    "value":0
                },
                ]
            },
            {
                "name":"Septiembre",
                "series":[
                {
                    "name":(parseInt(req.params.ano)-1).toString(),
                    "value":0
                },
                {
                    "name":req.params.ano,
                    "value":0
                },
                ]
            },
            {
                "name":"Octubre",
                "series":[
                {
                    "name":(parseInt(req.params.ano)-1).toString(),
                    "value":0
                },
                {
                    "name":req.params.ano,
                    "value":0
                },
                ]
            },
            {
                "name":"Noviembre",
                "series":[
                {
                    "name":(parseInt(req.params.ano)-1).toString(),
                    "value":0
                },
                {
                    "name":req.params.ano,
                    "value":0
                },
                ]
            },
            {
                "name":"Diciembre",
                "series":[
                {
                    "name":(parseInt(req.params.ano)-1).toString(),
                    "value":0
                },
                {
                    "name":req.params.ano,
                    "value":0
                },
                ]
            },
        ];

      
    //    Busca por Año Actual
        if (req.params.idClienteVet=='Todos'){
            query={ano:parseInt(req.params.ano),empresa_Id:req.params.idLaboratorio,
            estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }else{
            query={ano:parseInt(req.params.ano),empresa_Id:req.params.idLaboratorio,idCliente:req.params.idClienteVet,
                estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }

        const valorAnualGeneralActual = await ficha.aggregate([ 
            {
                $project:
                {
                    ano: { $year: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    mes: { $month: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    empresa_Id:"$empresa.empresa_Id",
                    idCliente:"$fichaC.cliente.idCliente",
                    precioValorFinal: "$fichaC.examen.precioValorFinal",
                    estadoFicha:"$estadoFicha",
                    estado:"$estado"
                    
                }
            },
            { $match:query}, 
            { $group:{ _id:"$mes","valorGeneralAnual" : {
                "$sum" : "$precioValorFinal"
            } } 
        }])

       // Llena registro valores  Año Consulta
        
        for (i = 0; i < valorAnualGeneralActual.length; i++) {
          //  registro[valorAnualGeneralActual[i]._id-1].series[1].name=req.params.ano;
            registro[valorAnualGeneralActual[i]._id-1].series[1].value=valorAnualGeneralActual[i].valorGeneralAnual;            
          } 


    //    Busca por Año Anterior
          if (req.params.idClienteVet=='Todos'){
            query={ano:parseInt(req.params.ano)-1,empresa_Id:req.params.idLaboratorio,
            estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }else{
            query={ano:parseInt(req.params.ano)-1,empresa_Id:req.params.idLaboratorio,idCliente:req.params.idClienteVet,
                estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }
          const valorAnualGeneralAnterior = await ficha.aggregate([ 
            {
                $project:
                {
                    ano: { $year: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    mes: { $month: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    empresa_Id:"$empresa.empresa_Id",
                    idCliente:"$fichaC.cliente.idCliente",
                    precioValorFinal: "$fichaC.examen.precioValorFinal",
                    estadoFicha:"$estadoFicha",
                    estado:"$estado"
                    
                }
            },
            { $match:query}, 
            { $group:{ _id:"$mes","valorGeneralAnual" : {
                "$sum" : "$precioValorFinal"
            } } 
        }])

       // Llena registro valores  Año Consulta
        
        for (i = 0; i < valorAnualGeneralAnterior.length; i++) {
          //  registro[valorAnualGeneralAnterior[i]._id-1].series[0].name=Srt(parseInt(req.params.ano)-1);
            registro[valorAnualGeneralAnterior[i]._id-1].series[0].value=valorAnualGeneralAnterior[i].valorGeneralAnual;            
          }
    console.log('registro:',registro);
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
          codigo: error.codigo, 
          mensaje: error
         };
        console.log(respuesta);
        return res.status(500).json(respuesta);
      }      
}

async function buscaVentasPorExamenes(req,res) {
    try {

       let registro=[];

      // Rescata los dos años y los junta
    //    Busca por Año Actual
        if (req.params.idClienteVet=='Todos'){
            query={ano:parseInt(req.params.ano),empresa_Id:req.params.idLaboratorio,
            estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }else{

            
            query={ano:parseInt(req.params.ano),empresa_Id:req.params.idLaboratorio,idCliente:req.params.idClienteVet,
                estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }

        const valorVentaPorExamenActual = await ficha.aggregate([ 
            {
                $project:
                {
                    ano: { $year: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    mes: { $month: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    nombreExamen: "$fichaC.examen.nombre",
                    empresa_Id:"$empresa.empresa_Id",
                    idCliente:"$fichaC.cliente.idCliente",
                    precioValorFinal: "$fichaC.examen.precioValorFinal",
                    estadoFicha:"$estadoFicha",
                    estado:"$estado"
                    
                }
            },
            { $match:query}, 
            { $group:{ _id:{"examenP":"$nombreExamen","anoP":"$ano"},"valorExamen" : {
                "$sum" : "$precioValorFinal"
                } } 
            },
            { $sort: { "_id.examenP": -1 } }
        ])

         //    Busca por Año Anterior
         if (req.params.idClienteVet=='Todos'){
            query={ano:parseInt(req.params.ano)-1,empresa_Id:req.params.idLaboratorio,
            estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }else{
            query={ano:parseInt(req.params.ano)-1,empresa_Id:req.params.idLaboratorio,idCliente:req.params.idClienteVet,
                estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }

        const valorVentaPorExamenAnterior = await ficha.aggregate([ 
            {
                $project:
                {
                    ano: { $year: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    mes: { $month: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    nombreExamen: "$fichaC.examen.nombre",
                    empresa_Id:"$empresa.empresa_Id",
                    idCliente:"$fichaC.cliente.idCliente",
                    precioValorFinal: "$fichaC.examen.precioValorFinal",
                    estadoFicha:"$estadoFicha",
                    estado:"$estado"
                    
                }
            },
            { $match:query}, 
            { $group:{ _id:{"examenP":"$nombreExamen","anoP":"$ano"},"valorExamen" : {
                "$sum" : "$precioValorFinal"
                } } 
            },
            { $sort: { "_id.examenP": -1 } }
        ])
      
   
        // Carga Año anterior busca en nuevo
        let index;

        for (a = 0; a < valorVentaPorExamenAnterior.length; a++) {

             index = valorVentaPorExamenActual.findIndex(valor => valor._id.examenP === valorVentaPorExamenAnterior[a]._id.examenP);
        //    console.log('examen:',valorVentaPorExamenAnterior[a])
        //    console.log('indice:',index)
             if(index===-1){
                nuevoObjeto={
                    "name":valorVentaPorExamenAnterior[a]._id.examenP,
                    "series":[
                    {
                        "name":(parseInt(req.params.ano)-1).toString(),
                        "value":valorVentaPorExamenAnterior[a].valorExamen
                    },
                    {
                        "name":req.params.ano,
                        "value":0
                    },
                    ]
                }
                registro.push(nuevoObjeto);
             }else{
                nuevoObjeto={
                    "name":valorVentaPorExamenActual[index]._id.examenP,
                    "series":[
                    {
                        "name":(parseInt(req.params.ano)-1).toString(),
                        "value":valorVentaPorExamenAnterior[a].valorExamen
                    },
                    {
                        "name":req.params.ano,
                        "value": valorVentaPorExamenActual[index].valorExamen
                    },
                    ]
                }
                registro.push(nuevoObjeto);
               
             }
            
            
           
        }

       ///Recorre consulta actual y guarda en Registro....
       
       for (a = 0; a < valorVentaPorExamenActual.length; a++) {
            console.log('valorVentaPorExamenActual[a]._id.examenP:',valorVentaPorExamenActual[a]._id.examenP);

        index = registro.findIndex(valor => valor.name === valorVentaPorExamenActual[a]._id.examenP); 
    
        if(index===-1){
            console.log('no encontro')
           nuevoObjeto={
               "name":valorVentaPorExamenActual[a]._id.examenP, 
               "series":[
                    {
                        "name":(parseInt(req.params.ano)-1).toString(),
                        "value":0   
                    },
                    {
                        "name":req.params.ano,
                        "value":valorVentaPorExamenActual[a].valorExamen
                    },
               ]
           }
           registro.push(nuevoObjeto);
        }else{
          console.log('encontro')
           registro[index].series[1].value=valorVentaPorExamenActual[a].valorExamen;
          
        }
       
       
      
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
          codigo: error.codigo, 
          mensaje: error
         };
        console.log(respuesta);
        return res.status(500).json(respuesta);
      }      
}

async function buscaVentasPorDia(req,res) {
    try {

       let registro=[];

      // Rescata los dos años y los junta
    //    Busca por Año Actual
        if (req.params.idClienteVet=='Todos'){
            query={ano:parseInt(req.params.ano),mes:parseInt(req.params.mes),empresa_Id:req.params.idLaboratorio,
            estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }else{

            
            query={ano:parseInt(req.params.ano),mes:parseInt(req.params.mes),empresa_Id:req.params.idLaboratorio,idCliente:req.params.idClienteVet,
                estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }

        const valorVentaPorDia = await ficha.aggregate([ 
            {
                $project:
                {
                    ano: { $year: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    mes: { $month: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    dia: { $dayOfMonth: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    nombreExamen: "$fichaC.examen.nombre",
                    empresa_Id:"$empresa.empresa_Id",
                    idCliente:"$fichaC.cliente.idCliente",
                    precioValorFinal: "$fichaC.examen.precioValorFinal",
                    estadoFicha:"$estadoFicha",
                    estado:"$estado"
                    
                }
            },
            { $match:query}, 
            { $group:{ _id:{"numDia":"$dia"},"valorDia" : {
                "$sum" : "$precioValorFinal"
                } } 
            },
            { $sort: { "_id.numDia":1 } }
        ])

        const diasMes=diasEnUnMes(req.params.mes,req.params.ano)
        console.log('dias mes:',diasMes)
        for (let i = 1; i < diasMes+1; i++) {

            index = valorVentaPorDia.findIndex(valor => valor._id.numDia === i);
       //    console.log('examen:',valorVentaPorExamenAnterior[a])
       //    console.log('indice:',index)
            if(index===-1){
               nuevoObjeto={
                   "name":i+'/'+req.params.mes+'/'+req.params.ano,
                   "value":0
               }
               registro.push(nuevoObjeto);
            }else{
                nuevoObjeto={
                    "name":i+'/'+req.params.mes+'/'+req.params.ano,
                    "value":valorVentaPorDia[index].valorDia
                }
               registro.push(nuevoObjeto);
              
            }  
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
          codigo: error.codigo, 
          mensaje: error
         };
        console.log(respuesta);
        return res.status(500).json(respuesta);
      }      
}

async function buscaVentasPorCliente(req,res) {
    try {

       let registro=[];

      // Rescata los dos años y los junta
    //    Busca por Año Actual
        if (req.params.idClienteVet=='Todos'){
            query={ano:parseInt(req.params.ano),empresa_Id:req.params.idLaboratorio,
            estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }else{

            
            query={ano:parseInt(req.params.ano),empresa_Id:req.params.idLaboratorio,idCliente:req.params.idClienteVet,
                estadoFicha:'Enviado', estado: {$ne:'Borrado'}};
        }

        const valorVentaPorCliente = await ficha.aggregate([ 
            {
                $project:
                {
                    ano: { $year: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    mes: { $month: "$seguimientoEstado.fechaHora_recepcionado_crea" },
                    nombreExamen: "$fichaC.examen.nombre",
                    empresa_Id:"$empresa.empresa_Id",
                    idCliente:"$fichaC.cliente.idCliente",
                    nombreCliente:"$fichaC.cliente.nombreFantasia",
                    precioValorFinal: "$fichaC.examen.precioValorFinal",
                    estadoFicha:"$estadoFicha",
                    estado:"$estado"
                    
                }
            },
            { $match:query}, 
            { $group:{ _id:{"nombreCliente":"$nombreCliente"},"valorCliente" : {
                "$sum" : "$precioValorFinal"
                } } 
            },
            { $sort: { "_id.nombreCliente": 1 } }
        ])

        for (a = 0; a < valorVentaPorCliente.length; a++) {

            nuevoObjeto={
                "name":valorVentaPorCliente[a]._id.nombreCliente,
                "value":valorVentaPorCliente[a].valorCliente
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
          codigo: error.codigo, 
          mensaje: error
         };
        console.log(respuesta);
        return res.status(500).json(respuesta);
      }      
}

function diasEnUnMes(mes, año) {
	return new Date(año, mes, 0).getDate();
}

module.exports = {
    buscaGeneralVentas,buscaVentasComparativoAnterior,buscaVentasPorExamenes,buscaVentasPorDia,buscaVentasPorCliente
}