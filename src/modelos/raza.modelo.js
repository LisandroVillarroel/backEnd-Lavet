const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaRaza = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    especieNombre:{ 
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
    empresa_Id: {
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

const razaModel = mongoose.model('tabRaza', schemaRaza);
module.exports =  razaModel;