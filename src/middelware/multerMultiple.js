'use strict'

 const multer = require('multer');
 const fs = require('fs');

 function  uploadArchivos_(){ 
    try{
       console.log('ppaso')

        const storage = multer.diskStorage({
            
            destination: async function (req, file, cb) {
                console.log('ppaso Rut empresa',req.params.rutEmpresaDirectorio)
                //Verifica si Existe el directorio---Ojo también toma en cuenta el nombre archico como directorio

                if (!fs.existsSync('public/pdfs/'+req.params.rutEmpresaDirectorio)){
                    fs.mkdir('public/pdfs/'+req.params.rutEmpresaDirectorio, (error)=>{
                        if (error){
                            return res.status(401).send({ message: error.message})
                        }
                    })
                    fs.mkdir('public/pdfs/'+req.params.rutEmpresaDirectorio+'/interno', (error)=>{
                        if (error){
                            return res.status(401).send({ message: error.message})
                        }
                    })
                }else{
                    if (!fs.existsSync('public/pdfs/'+req.params.rutEmpresaDirectorio+'/interno')){
                        fs.mkdir('public/pdfs/'+req.params.rutEmpresaDirectorio+'/interno', (error)=>{
                            if (error){
                                return res.status(401).send({ message: error.message})
                            }
                        })
                    }
                }
                cb(null, 'public/pdfs/'+req.params.rutEmpresaDirectorio+'/interno')
              },       
            filename: function (req, file, cb) {

             //   var extension=file.originalname.slice(file.originalname.lastIndexOf('.'));
               // console.log('extension:', extension);
                cb(null, file.originalname); 
            }
        })
        console.log('paso 2 unload')
        const upload = multer({ storage: storage }).array('file');
        console.log('paso 2 unload2:',upload)
        return upload
    }catch(error){
        console.log('error',error);
    }
}
module.exports = uploadArchivos_