const mongoose = require('mongoose');
const authSchema = require('./auth.model');

authSchema.statics = {
    create: function (data,cb){
        const usuario = new this(data);
        usuario.save(cb);
    },
    login: function (query,cb){
        this.findOne(query,cb);
    }
}

const authModel = mongoose.model('Usuarios', authSchema);
module.exports = authModel;

