const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaEmpresa = new Schema({
    rutEmpresa: {
        type: String,
        required: true,
        trim: true
    },
    razonSocial: {
        type: String,
        required: true,
        trim: true
        
    },
    nombreFantasia: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    nombreContacto: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    tipoEmpresa: {        //Administrador-Laboratorio-Cliente 
        type: String,
        required: true,
        trim: true
    },
    menu_Id: {        //Menu asociado 
        type: String,
        required: true,
        trim: true
    },
    envioEmail: {
        emailEnvio: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            trim: true
        },
        nombreDesde: {
            type: String,
            trim: true
        },
        asunto: {
            type: String,
            trim: true
        },
        tituloCuerpo: {
            type: String,
            trim: true
        },
        tituloCuerpoMedio: {
            type: String,
            trim: true
        },
        tituloCuerpoPie: {
            type: String,
            trim: true
        },
    },
    correoRecepcionSolicitud: {
        type: String,
        required: false,
        trim: true
    },
    nombreLogo: {        //Menu asociado 
        type: String,
        trim: true
    },
    usuarioCrea_id: {
        type: String,
        required: false,
        trim: true
    },
    usuarioModifica_id: {
        type: String,
        required: true,
        trim: true
    },
    estado: { 
        type: String, 
        default: 'Activo' 
    }
},{
    timestamps: { createdAt: 'fechaHora_crea', updatedAt: 'fechaHora_modifica'}
    // Guardar Fecha creacion y actualizacion
});

const empresaModel = mongoose.model('tabEmpresa', schemaEmpresa);
module.exports =  empresaModel;