'use strict'
const nodemailer = require('nodemailer');
const path_ = require('path');
const usuEnvioClienteCorreo = require('./../config/propiedades').USU_ENVIA_CLIENTE_FINAL_MAIL;  //Usuario envía correo Cliente Final
const pswEnvioClienteCorreo = require('./../config/propiedades').PSW_ENVIA_CLIENTE_FINAL_MAIL;  //Contraseña envía correo cliente final

require('dotenv').config();
this.enviar_mailReset = (datoEmpresa,nombres,apellidoPaterno,link) => {
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: datoEmpresa[0].envioEmail.emailEnvio,
            pass: datoEmpresa[0].envioEmail.password
        }
    });
    let mail_options = {
        from: 'Pabs',
        to: 'lisandrovillarroell@gmail.com',
        subject: 'Recuperar Contraseña',
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
    transporter.sendMail(mail_options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo se envío correctamente ' + info.response);
        }
    });
};
module.export = this;