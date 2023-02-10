'use strict'

 const multer = require('multer');
 const path = require("path");
 const fs = require('fs');
 const ficha = require('../modelos/ficha.modelo');

 function  upload_(){ 
    try{
       console.log('ppaso')

        const storage = multer.diskStorage({
            
            destination: async function (req, file, cb) {

                let query={};
        
                query={_id: req.params.ficha_id, estado: {$ne:'Borrado'}};
                const ficha_ = await ficha.find(query)
                console.log('query:', query)
                //Verifica si Existe el directorio---Ojo también toma en cuenta el nombre archico como directorio
                console.log('rut empresa a:',ficha_[0].empresa.rutEmpresa.slice(0, -2))
                if (!fs.existsSync('public/pdfs/'+ficha_[0].empresa.rutEmpresa.slice(0, -2))){
                    fs.mkdir('public/pdfs/'+ficha_[0].empresa.rutEmpresa.slice(0, -2), (error)=>{
                        if (error){
                            return res.status(401).send({ message: error.message})
                        }
                    })
                }
                cb(null, 'public/pdfs/'+ficha_[0].empresa.rutEmpresa.slice(0, -2))
              },           
            filename: function (req, file, cb) {

             //   var extension=file.originalname.slice(file.originalname.lastIndexOf('.'));
               // console.log('extension:', extension);
                cb(null, file.originalname); 
            }
        })
        console.log('paso 2 unload')
        const upload = multer({ storage: storage }).single('file');
        console.log('paso 2 unload2:',upload)
        return upload
    }catch(error){
        console.log('error',error);
    }
}
module.exports = upload_