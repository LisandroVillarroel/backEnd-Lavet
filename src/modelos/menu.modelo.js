const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const schemaMenu = new Schema({
    
    MenuItem:[{
        displayName: {
            type: String,
            trim: true
        },
        iconName: {
            type: String,
            trim: true
        },
        route: {
            type: String,
            trim: true
        },
        tipoPermiso: {
            type: String,
            trim: true
        },
        selected:{
            type: Boolean,
            trim: true
        },
        indeterminate:{
            type: Boolean,
            trim: true
        },
        children: [{
            displayName: {
                type: String,
                trim: true
            },
            iconName: {
                type: String,
                trim: true
            },
            route: {
                type: String,
                trim: true
            },
            tipoPermiso: {
                type: String,
                trim: true
            },
            selected:{
                type: Boolean,
                trim: true
            },
            indeterminate:{
                type: Boolean,
                trim: true
            },
        }],
    }],
    nombreMenu: {
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
    },
},{
    timestamps: { createdAt: 'fechaHora_crea', updatedAt: 'fechaHora_modifica'}
    // Guardar Fecha creacion y actualizacion
});

const menuModel = mongoose.model('tabMenu', schemaMenu);
module.exports =  menuModel;