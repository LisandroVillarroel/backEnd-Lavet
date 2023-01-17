const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaUsuario = new Schema({
    usuario: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true,
        trim: true
    },
    rutUsuario: {
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
    usuarioLaboratorioCliente: {
        laboratorioCliente_Id: {
            type: String,
            required: true,
            trim: true
        },
        laboratorioCliente_rut: {
            type: String,
            required: true,
            trim: true
        },
        laboratorioCliente_razonSocial: {
            type: String,
            required: true,
            trim: true
        },
        laboratorioCliente_nombreFantasia: {
            type: String,
            required: true,
            trim: true
        },

        laboratorioCliente_menu_Id: {
            type: String,
            required: true,
            trim: true
        },
        laboratorioCliente_tipoEmpresa: {
            type: String,
            required: true,
            trim: true
        },
    },
   
    estado: { 
        type: String, 
        default: 'Activo' 
    }
},{
    timestamps: { createdAt: 'fechaHora_crea', updatedAt: 'fechaHora_modifica'}
    // Guardar Fecha creacion y actualizacion
});

module.exports = schemaUsuario;