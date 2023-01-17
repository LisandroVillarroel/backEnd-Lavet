const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaExamenFicha = new Schema({
    ficha:{
        numeroFicha: {
            type: Number,
            unique: true,
          //  trim: true
        },
        cliente:{
            idCliente:{
                type: String,
                required: true,
                trim: true
            },
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
        },
        nombrePropietario: {      
            type: String,
            required: true,
            trim: true
        },
        nombrePaciente: {
            type: String,
            required: true,
            trim: true  
        },
        edadPaciente: {
            type: String,
            required: true,
            trim: true
        },
        especie: {
            idEspecie:{
                type: String,
                required: true,
                trim: true    
            },
            nombre: {
                type: String,
                required: true,
                trim: true  
            },
        },
        raza: {
            idRaza:{
                type: String,
                required: true,
                trim: true    
            },
            nombre: {
                type: String,
                required: true,
                trim: true  
            },
        },
        sexo: {
            type: String,
            required: true,
            trim: true
        },
      
        doctorSolicitante:{ 
            type: String,
            required: true,
            trim: true
        },
        examen:{
            idExamen:{
                type: String,
                required: true,
                trim: true    
            },
            codigoExamen: {
                type: String,
                required: true,
                trim: true
            },
            nombre: {
                type: String,
                required: true,
                trim: true  
            },
        },
       
    },

    usuarioAsignado:{
            idUsuario: {
                type: String,
                required: true,
                trim: true
            },
            usuario: {
                type: String,
                required: true,
                trim: true
            },
            rutUsuario: {
                type: String,
                required: true,
                trim: true
            },
            nombreCompleto: {
                type: String,
                required: true,
                trim: true
            },
            
        },
    empresa_Id: {
            type: String,
            required: true,
            trim: true
        },
    estadoFicha:{
        type: String, 
        default: 'Ingresado' 
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
    },

},{
    timestamps: { createdAt: 'fechaHora_crea', updatedAt: 'fechaHora_modifica'}
    // Guardar Fecha creacion y actualizacion
});

const examenFichaModel = mongoose.model('tabExamenFicha', schemaExamenFicha);
module.exports =  examenFichaModel;