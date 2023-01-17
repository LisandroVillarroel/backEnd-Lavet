const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaParametro = new Schema({
    empresa_id: {
        type: String,
        required: true,
        unique: true,
    },
    letra: {
        type: String,
        required: true,
        unique: true,
    },
    numeroFicha: {
        type: Number,
        required: true,
    }
},{
    timestamps: { createdAt: 'fechaHora_crea', updatedAt: 'fechaHora_modifica'}
    // Guardar Fecha creacion y actualizacion
});

const parametroModel = mongoose.model('tabParametro', schemaParametro);
module.exports =  parametroModel;