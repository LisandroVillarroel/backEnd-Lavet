const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaValidador = new Schema({
    rutValidador: {
        type: String,
        required: true,
        trim: true
    },
    nombres: {
        type: String,
        required: true,
        trim: true
        
    },
    apellidoPaterno: {
        type: String,
        required: true,
        trim: true
    },
    apellidoMaterno: {
        type: String,
        required: true,
        trim: true
    },
    profesion: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    nombreFirma: {
        type: String,
        required: true,
        trim: true
    },
    empresa_Id: {
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
    estado: { 
        type: String, 
        default: 'Activo' 
    }
},{
    timestamps: { createdAt: 'fechaHora_crea', updatedAt: 'fechaHora_modifica'}
    // Guardar Fecha creacion y actualizacion
});

const validadorModel = mongoose.model('tabValidador', schemaValidador);
module.exports =  validadorModel;