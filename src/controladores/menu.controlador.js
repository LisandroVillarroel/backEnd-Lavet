const menu = require('../modelos/menu.modelo');

async function crearMenu(req,res) {
    console.log('pasoooo');
    if(req.body.menus){             // Si trae información de la búsqueda anterior
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
        
        console.log('dato menu',req.body);
        const menu_resp = await new menu(req.body).save();
        
        respuesta = {
            error: false, 
            data: menu_resp,
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


async function actualizarMenu(req,res) {

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

    if(!req.body.menus){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro la Menu'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let menu_actualiza = req.body.menus[0];
        
        menu_actualiza = Object.assign(menu_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        
        const menu_resp =await menu.updateOne({_id: req.params.id},menu_actualiza) 

        respuesta = {
            error: false, 
            data: menu_resp,
            codigo: 200, 
            mensaje: 'ok'
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

function buscarMenu(req,res) {
   
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

    if(req.body.menus){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.menus,
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
        mensaje: 'No encontró la Menu'
    };
    return res.status(200).json(respuesta);
}

async function eliminarMenu(req,res) {

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

    if(!req.body.menus){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Menu'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        
        queryModifica={usuarioModifica_id: req.params.idUsu, estado:'Borrado'};
        await menu.updateOne({_id: req.params.id},queryModifica) 
        
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

async function buscarTodosMenu(req,res) {
    try {
        
        query={estado: {$ne:'Borrado'}};
        
        console.log('query menu:',query);
        const menus = await menu.find(query) //.sort('nombrePaciente');
        respuesta = {
            error: false, 
            data: menus,
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

async function buscarMenuNombre(req,res) {

   
    // si encontro información reemplaza información
    try {
        query={nombreMenu:req.params.nombreM,estado: {$ne:'Borrado'}};
        
        const menu_resp = await menu.find(query).sort('nombreMenu');

        respuesta = {
            error: false, 
            data: menu_resp,
            codigo: 200, 
            mensaje: 'ok'
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


 // next pasa a la siguiente función
async function buscaId(req,res,next){
    try {
        let query={};
        query={_id: req.params.id, estado: {$ne:'Borrado'}};
        const menus = await menu.find(query)
        if(!menus.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.menus=menus;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    crearMenu,actualizarMenu,buscarMenu,eliminarMenu,buscarTodosMenu,buscarMenuNombre,buscaId
}