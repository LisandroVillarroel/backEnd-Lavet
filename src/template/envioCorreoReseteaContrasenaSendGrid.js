'use strict'
/* Correo envíado al usuario para que cambie la contraseña*/
const sgMail= require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

require('dotenv').config();
this.enviar_mailReset = (email,nombres,apellidoPaterno,link) => {
    
    const msg = {
        to: email,
        from: "No Responder LAVET<no-reply.lavet@sidetec.cl>",
        subject: 'Recuperar Contraseña',
        //text: "cuerpo 11111",
        html: `
        <table border="0" cellpadding="0" cellspacing="0" width="600px" >
            <tr height="200px">  
                <td bgcolor="" width="600px">
                    <h1 style="text-align:left">Hola ${nombres+' '+apellidoPaterno}</h1>
                    <p  style=" text-align:left">
                    ¿Solicitaste un cambio de contraseña? Si es así, puedes crear tu nueva contraseña aquí:
                    </p>
                    ${link}
                </td>
            </tr>
           
        </table>
 `
    };
    console.log('msg:',msg)
sgMail.send(msg).then(result => {
    console.log("Email Enviado",result);
  }, err => {
    console.error('error correo:',err);
  });
};
module.export = this;