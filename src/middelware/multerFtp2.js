'use strict'
const ftp = require('ftp');
const ftpStorage = require('multer-ftp');

 const multer = require('multer');
 const path = require("path");
 const fs = require('fs');
 const ficha = require('../modelos/ficha.modelo');

 function  uploadFtp_(){ 
    try{
      console.log('paso ftp')
        

        const ftpClient = new ftp();

        ftpClient.connect({
            secure: false,
            port: 21,
            host: 'www.sidetec.cl',
            user: 'sidetecc',
            password: 'BvS7N0t4i2l)S*'
          });


           const storage = new ftpStorage({
            basepath: './public_html/pdf/',
            connection: ftpClient,
          destination: async function(req, file,options, cb) {
            let query={};
            console.log('paso1',req.params.ficha_id)
            query={_id: req.params.ficha_id, estado: {$ne:'Borrado'}};
            console.log('query',query);
            const ficha_ =  await ficha.find(query)
            //Verifica si Existe el directorio---Ojo también toma en cuenta el nombre archico como directorio
            console.log('http pdf nombre:',ficha_[0].empresa.rutEmpresa.slice(0, -2));
            cb(null,'./public_html/pdf/'+ficha_[0].empresa.rutEmpresa.slice(0, -2)+'/'+file.originalname);
          },
          
        });
        console.log('paso10')
        const fileFilter = (req, file, cb) => {
            console.log('filter:',file)
          if (file.mimetype === "application/pdf") {
            cb(null, true);
          } else {
            cb(null, false);
          }
        };
        
       // console.log('filter:',fileFilter.apply)
        const uploadFt_ = multer({ storage: storage,fileFilter:fileFilter}).single('file');
        ftpClient.end;
        return uploadFt_
    }catch(error){
        console.log('error',error);
        return res.status(401).send({ message: error.message})
    }
}
module.exports = uploadFtp_