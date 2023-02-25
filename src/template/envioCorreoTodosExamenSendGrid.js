'use strict'
/*Correo que envia el laboratorio al cliente con el exámen*/
const sgMail= require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const path_ = require('path');
const fs = require("fs");



this.enviar_mail = (dato,ficha_) => {
  try{
    let adjuntos=[];
    let attachment
    let pathToAttachment
    let archivoPdf
    let internoExterno=''
    const nombre_cliente=dato.envioEmail.nombreCliente
    const saludo=mostrarSaludo()

    console.log('envia ficha_Sendgrid:',ficha_)
    console.log('ficha_[a].fichaC.numeroFicha', ficha_[0].fichaC.numeroFicha)
    for (let a = 0; a < ficha_.length; a++) {
      if(ficha_[a].fichaC.examen.internoExterno=="Interno")
        internoExterno="interno";
      else
        internoExterno="externo";
      
      pathToAttachment =   path_.join(__dirname,'../../public/pdfs/'+dato.rutEmpresa.slice(0, -2)+'/'+internoExterno+'/'+ ficha_[a].fichaC.numeroFicha+'.pdf');

      attachment = fs.readFileSync(pathToAttachment).toString("base64");

      archivoPdf={
      "content": attachment,
      "filename": ficha_[a].fichaC.examen.nombre+'-'+dato.nombrePaciente+'-'+ficha_[a].fichaC.numeroFicha+'.pdf',
      "type": "application/pdf",
      "disposition": 'attachment'
      }
      adjuntos.push(archivoPdf)
    }
    
  console.log('email adjuntos:',adjuntos)

    const tituloCuerpo= dato.envioEmail.tituloCuerpo.replace("nombre_cliente_",nombre_cliente).replace("saludo_",saludo);
    const msg = {
          to: dato.correoRecepcionCliente, //"lisandrovillarroell@gmail.com",
          from: "No Responder LAVET<no-reply.lavet@sidetec.cl>",
          subject: dato.envioEmail.asunto + ' ' + dato.id_Ficha+' '+ dato.nombrePaciente.toUpperCase(),
          //text: "cuerpo 11111",
          html: `
          <table border="0" cellpadding="0" cellspacing="0" width="600px"  >
              <tr height="200px">  
                  <td bgcolor="" width="600px">
                     ${tituloCuerpo}
                  </td>
              </tr>
              
          </table>
  `,
          attachments: adjuntos
    };

    //  console.log('msg:',msg)
   /* sgMail.send(msg).then(result => {
      console.log("Sent email",result);
      
      (async () => {
        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(error);
      
          if (error.response) {
            console.error(error.response.body)
          }
        }
      })();
    
    }, err => {
      console.error('error correo:',err);
      return 'err'
    });
*/
    (async () => {
      try {
        await sgMail.send(msg);
        respuesta = {
          error: false, 
          data: '',
          codigo: 200, 
          mensaje: ''
        };
        console.log('okkkkkkkkkkkkkkkkkkkkkk:',respuesta);
        return respuesta;
      } catch (error) {
        console.error(error); 
        respuesta = {
          error: true, 
          data: '',
          codigo: 500, 
          mensaje: error
        };
        return respuesta;
      }
    })();
  }
  catch(error) {
    respuesta = {
      error: true, 
      data: '',
      codigo: 500, 
      mensaje: error
    };
    console.log('error correo:',respuesta);
    return respuesta;
  }
  respuesta = {
    error: false, 
    data: '',
    codigo: 200, 
    mensaje: ''
  };
  console.log('ultima envia:',respuesta);
  return respuesta;
}

function mostrarSaludo(){
 
  const fecha = new Date(); 
  const hora = fecha.getHours();
  let texto='';
 
  if(hora >= 0 && hora < 12){
    texto = "Buenos Días";
  }
 
  if(hora >= 12 && hora < 18){
    texto = "Buenas Tardes";
  }
 
  if(hora >= 18 && hora < 24){
    texto = "Buenas Noches";
  }
 return texto;
 
}
module.export = this;