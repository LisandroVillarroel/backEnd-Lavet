const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaCliente = new Schema({
    rutCliente: {
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
    nombreContacto: {
        type: String,
        required: true,
        trim: true
    },

    empresa: [{
        empresa_Id: {
            type: String,
            required: true,
            trim: true
        },
        menu_Id: {
            type: String,
            required: true,
            trim: true
        },

        usuarioModifica_id: {
            type: String,
            required: true,
            trim: true
        },
        fechaHora_modifica: {
            type: Date,
            default: new Date,
            trim: true
        },
        estado: { 
            type: String, 
            default: 'Activo' 
        }
    }],
    envioEmail: {
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
    emailRecepcionExamenCliente: {
        type: String,
        required: true,
        trim: true
    },
    tipoEmpresa: {
        type: String,
        required: true,
        trim: true
    },
    nombreLogo: {
        type: String,
        required: true,
        trim: true
    },
    estado: { 
        type: String, 
        default: 'Activo' 
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
},{
    timestamps: { createdAt: 'fechaHora_crea', updatedAt: 'fechaHora_modifica'}
    // Guardar Fecha creacion y actualizacion
});

const clienteModel = mongoose.model('tabCliente', schemaCliente);
module.exports =  clienteModel;