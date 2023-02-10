'use strict'


 const path = require("path");
 const fs = require('fs');
 

 this.elimina = (archivo) => {
    try {
       
        
  //      const archivoAEliminar=path.join(__dirname,archivo)
    ///    fs.unlinkSync(archivoAEliminar);
        console.log('eliminaaaaaaaaaaaaaaaaaaaaaaaaaa');
        return next();
    } catch(error) {
       console.log('error elimina archivo local')  // si hay un error lo guarda y pasa a la siguiente funcion
    }
}
            
        

   
module.exports = this