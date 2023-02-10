'use strict'
/*Correo que envia el laboratorio al cliente con el exámen*/
const sgMail= require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const path_ = require('path');
const fs = require("fs");



this.enviar_mail = (dato) => {
  try{

    const  pathToAttachment =   path_.join(__dirname,'../../public/pdfs/'+dato.rutEmpresa.slice(0, -2)+'/'+ dato.numFicha+'.pdf');
  //console.log('email dato:',dato)

    const attachment = fs.readFileSync(pathToAttachment).toString("base64");
    const msg = {
          to: dato.correoRecepcionCliente, //"lisandrovillarroell@gmail.com",
          from: "No Responder LAVET<no-reply.lavet@sidetec.cl>",
          subject: dato.envioEmail.asunto + ' ' + dato.nombreExamen.toUpperCase(),
          //text: "cuerpo 11111",
          html: `
          <table border="0" cellpadding="0" cellspacing="0" width="600px"  >
              <tr height="200px">  
                  <td bgcolor="" width="600px">
                      <h1  text-align:center">${dato.envioEmail.tituloCuerpo}</h1>
                      <p   text-align:center">
                          <span style="color: #e84393">${dato.nombreExamen}</span> 
                          ${dato.envioEmail.tituloCuerpoMedio}
                      </p>
                  </td>
              </tr>
              <tr bgcolor="#fff">
                  <td style="text-align:center">
                      <p style="color: #000">${dato.envioEmail.tituloCuerpoPie}</p>
                  </td>
              </tr>
          </table>
  `,
          attachments: [
            { // Use a URL as an attachment

              content: attachment,
              filename: dato.nombreExamen+'-'+dato.numFicha+'.pdf',
              type: "application/pdf",
              disposition: "attachment"
          }
        ]
    };
      //console.log('msg:',msg)
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
module.export = this;