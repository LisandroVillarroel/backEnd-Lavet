const mongoose = require('mongoose');
const clienteSchema = require('../modelos/cliente.modelo.js');
clienteSchema.statics = {
    crear: function (data,cb)
    {
        const cliente = new this(data);
        cliente.save(cb);
    },
    buscar: function (query,cb){
        console.log('buscar dao query: ', query);
        console.log('buscar dao cb: ', cb);
        this.findOne(query,cb);
    },
    buscarTodos: function (query,cb){
        this.find(query,cb);
    },
    eliminar: function (query,dato,cb){
        console.log('dato: ', dato);
        
        this.updateOne(query,dato,cb);
    },
    modificar: function (query,dato,cb){
        console.log('dato: ', dato);
        
        this.updateOne(query,dato,cb);
    }
}

const clienteModel = mongoose.model('tabCliente', clienteSchema);
module.exports = clienteModel;

