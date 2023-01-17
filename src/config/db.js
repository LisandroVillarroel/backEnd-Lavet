const mongoose = require('mongoose');
const dbURL = require('./propiedades').DB;

module.exports = ()=>{
    mongoose.connect(dbURL,{useUnifiedTopology: true, useNewUrlParser: true})
        .then(()=> console.log(`Conexión con Mongo en ${dbURL}`))
        .catch(err => console.log(`Conexión con Error ${err}`) )

        process.on('SIGINT',()=> {
            mongoose.connection.close (()=> {
                console.log(`Mongo se Desconectó`);
                process.exit(0)
            })
        })
}