'use strict'
const nodemailer = require('nodemailer');
const path_ = require('path');
const usuEnvioClienteCorreo = require('../config/propiedades').USU_ENVIA_CLIENTE_FINAL_MAIL;  //Usuario envía correo Cliente Final
const pswEnvioClienteCorreo = require('../config/propiedades').PSW_ENVIA_CLIENTE_FINAL_MAIL;  //Contraseña envía correo cliente final

require('dotenv').config();
this.enviar_mail_recepcion_Solicitud = (dato) => {
    console.log('envio correo:',dato);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: usuEnvioClienteCorreo,
            pass: pswEnvioClienteCorreo 
        }
    });
    let tabla= '<table style="border:1px solid black;border-collapse:collapse;">'
    tabla=tabla+'<tr bgcolor="#CACFD2" style="border:1px solid black;border-collapse:collapse; text-align:center;"><td  style="border:1px solid black;border-collapse:collapse;">N°</td><td style="border:1px solid black;border-collapse:collapse;">Exámen</td></tr>'
    for (var i = 0; i < dato.examenesSolicitados.length; i++) { 
        tabla=tabla+  `<tr style="border:1px solid black;border-collapse:collapse;"><td style="border:1px solid black;border-collapse:collapse;">${i+1}</td><td style="border:1px solid black;border-collapse:collapse;">${dato.examenesSolicitados[i].nombreExamen}</td></tr>`;
    }
    tabla= tabla+' </table>'

    let mail_options = {
        from: 'Pabs',
        to: dato.emailRecepcion, //'lisandrovillarroell@gmail.com'
        subject: dato.rutCliente +'-'+ dato.nombreFantasiaCliente +'('+dato.numFicha+')' ,
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
    transporter.sendMail(mail_options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo se envío correctamente ' + info.response);
        }
    });
};
module.export = this;