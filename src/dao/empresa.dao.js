const mongoose = require('mongoose');
const empresaSchema = require('../modelos/empresa.modelo.js');
empresaSchema.statics = {
    crear: function (data,cb)
    {
        const empresa = new this(data);
        empresa.save(cb);
    },
    buscar: function (query,cb){
        console.log(query);
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

const empresaModel = mongoose.model('tabEmpresa', empresaSchema);
module.exports = empresaModel;

