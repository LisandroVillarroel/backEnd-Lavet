const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaAcceso = new Schema({

    empresa_id: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
        
    },
    nombreModulo: {
        type: String,
        required: true,
        trim: true
    },
    nombreIcono: {
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

const accesoModel = mongoose.model('tabTiAccesos', schemaAcceso);
module.exports =  accesoModel;