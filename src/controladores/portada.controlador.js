const ficha = require('../modelos/ficha.modelo');




async function buscaTotalxEstadosLab(req,res) {
    let enviado=0;
    let ingresado=0;
    let solicitado=0;
    let recepcionado=0;

    try {
       
        query={empresa_Id:req.params.idEmpresa, estado: {$ne:'Borrado'}};

        const valorEstadosLab = await ficha.aggregate([ 
            {
                $project:
                  {
                    empresa_Id:"$empresa.empresa_Id",
                    estadoFicha:"$estadoFicha",
                    estado:"$estado"
                    
                  }
            },
            { $match:query}, 
            { $group:{ _id:{"estadoFicha":"$estadoFicha"},total: { $sum: 1 } } 
        }])

        for (i = 0; i < valorEstadosLab.length; i++) {
            console.log('valor:',valorEstadosLab[i]._id.estadoFicha);     
            console.log('valor total:',valorEstadosLab[i].total);  
            if (valorEstadosLab[i]._id.estadoFicha=="Enviado")
                enviado=valorEstadosLab[i].total;
            if (valorEstadosLab[i]._id.estadoFicha=="Ingresado")
                ingresado=valorEstadosLab[i].total;
            if (valorEstadosLab[i]._id.estadoFicha=="Solicitado")
                solicitado=valorEstadosLab[i].total;
            if (valorEstadosLab[i]._id.estadoFicha=="Recepcionado")
                recepcionado=valorEstadosLab[i].total;


            } 

        let registro={
            "Enviado":enviado,
            "Ingresado":ingresado,
            "Solicitado":solicitado,
            "Recepcionado":recepcionado
        }
        console.log('registro:',registro)
        // Extra valor mes 
       
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

async function buscaTotalxEstadosCli(req,res) {
    
    let solicitado=0;
    let recepcionado=0;
    let recibido=0;

    const ano_= new Date().getFullYear();
    const mes_= new Date().getMonth()+1;
    const dia_= new Date().getDate();
    console.log('fecha actual;',new Date())

    try {
       
        query={idCliente:req.params.idCliente, estadoFicha:{ $in: ['Solicitado','Recepcionado']},estado: {$ne:'Borrado'}};

        const valorEstadosCli = await ficha.aggregate([ 
            {
                $project:
                  {
                    idCliente:"$fichaC.cliente.idCliente",
                    estadoFicha:"$estadoFicha",
                    estado:"$estado"
                  }
            },
            { $match:query}, 
            { $group:{ _id:{"estadoFicha":"$estadoFicha"},total: { $sum: 1 } } 
        }])

        for (i = 0; i < valorEstadosCli.length; i++) {  
            if (valorEstadosCli[i]._id.estadoFicha=="Solicitado")
                solicitado=valorEstadosCli[i].total;
            if (valorEstadosCli[i]._id.estadoFicha=="Recepcionado")
                recepcionado=valorEstadosCli[i].total;
        } 


        //Esta query busca los enviados para mostrarlo como entregado al cliente
        query={idCliente:req.params.idCliente, ano:parseInt(ano_),mes:parseInt(mes_),dia:parseInt(dia_), estadoFicha:'Enviado',estado: {$ne:'Borrado'}};
        console.log('query enviado:',query)
        const valorEstadoCliEnviado = await ficha.aggregate([ 
            {
                $project:
                  {
                    ano: { $year: "$seguimientoEstado.fechaHora_enviado" },
                    mes: { $month: "$seguimientoEstado.fechaHora_enviado" },
                    dia: { $dayOfMonth: "$seguimientoEstado.fechaHora_enviado" },
                    idCliente:"$fichaC.cliente.idCliente",
                    estadoFicha:"$estadoFicha",
                    estado:"$estado"
                  }
            },
            { $match:query}, 
            { $group:{ _id:{"estadoFicha":"$estadoFicha"},total: { $sum: 1 } } 
        }])
        console.log('resultado enviado:',valorEstadoCliEnviado)
        if ( valorEstadoCliEnviado.length>0) {  
            console.log('recibido:',valorEstadoCliEnviado[0].total)
                recibido=valorEstadoCliEnviado[0].total;
            } 



console.log('valorAnualGeneral:',valorEstadoCliEnviado)
        let registro={
            "Solicitado":solicitado,
            "Recepcionado":recepcionado,
            "Recibido":recibido
        }
        console.log('registro:',registro)
        // Extra valor mes 
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


module.exports = {
    buscaTotalxEstadosLab,buscaTotalxEstadosCli
}