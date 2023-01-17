const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaExamen = new Schema({
    codigoExamen: {
        type: String,
       // required: true,
        trim: true
    },
    codigoInterno: {
        type: Number,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true  
    },
    sigla: {
        type: String,
        required: true,
        trim: true
    },
    nombreExamen: {
        type: String,
        trim: true  
    },
    precio: {
        type: Number,
        required: true,
        trim: true
    },
    diasPreparacion: {
        type: Number,
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

const examenModel = mongoose.model('tabExamen', schemaExamen);
module.exports =  examenModel;