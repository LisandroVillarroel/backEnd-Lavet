const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaDoctorSolicitante = new Schema({
    cliente:{
        idCliente: {
            type: String,
            required: true,
            trim: true
        }, 
        nombreFantasia: {
            type: String,
            required: true,
            trim: true
        },
    },
    nombre: {
        type: String,
        required: true,
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
    /*
    empresa_Id: {
        type: String,
        required: true,
        trim: true
    },
    */
    estado: { 
        type: String, 
        default: 'Activo' 
    }
},{
    timestamps: { createdAt: 'fechaHora_crea', updatedAt: 'fechaHora_modifica'}
    // Guardar Fecha creacion y actualizacion
});

const doctorSolicitanteModel = mongoose.model('tabDoctorSolicitante', schemaDoctorSolicitante);
module.exports =  doctorSolicitanteModel;