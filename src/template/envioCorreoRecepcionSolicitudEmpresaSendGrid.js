'use strict'
/*Envio correo del cliente al laboratorio con la solicitud de exámenes solicitados*/ 
const sgMail= require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require('dotenv').config();
this.enviar_mail_recepcion_Solicitud = (dato) => {
    let tabla= '<table style="border:1px solid black;border-collapse:collapse;">'
    tabla=tabla+'<tr bgcolor="#CACFD2" style="border:1px solid black;border-collapse:collapse; text-align:center;"><td  style="border:1px solid black;border-collapse:collapse;">N°</td><td style="border:1px solid black;border-collapse:collapse;">Exámen</td></tr>'
    for (var i = 0; i < dato.examenesSolicitados.length; i++) { 
        tabla=tabla+  `<tr style="border:1px solid black;border-collapse:collapse;"><td style="border:1px solid black;border-collapse:collapse;">${i+1}</td><td style="border:1px solid black;border-collapse:collapse;">${dato.examenesSolicitados[i].nombreExamen}</td></tr>`;
    }
    tabla= tabla+' </table>'

    const msg = {
        to: dato.emailRecepcion,
        from: "No Responder LAVET<no-reply.lavet@sidetec.cl>",
        subject: dato.rutCliente +'-'+ dato.nombreFantasiaCliente +'('+dato.numFicha+')' ,
        //text: "cuerpo 11111",
        html: `
            <h2>Exámenes solicitados por: ${dato.nombreFantasiaCliente } </h2>
            <table border="0" cellpadding="0" cellspacing="0" width="600px">
             
                <tr height="100px">  
                ${tabla}
        
                </tr>
                <tr bgcolor="#fff">
                    <td style="text-align:center">
                        <p style="color: #000"></p>
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