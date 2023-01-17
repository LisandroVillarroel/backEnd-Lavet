'use strict'

const jwt = require('jwt-simple');
const moment =require('moment');
const codSecretoToken = require('../config/propiedades');

async function  isPermiso(req, res, next){
    try{
        if (!req.headers.authorization){
            return res.status(403).send({ message: 'No tienes autorizaciónn'})
        }
        const token = await req.headers.authorization.split(' ')[1];
        const payload = jwt.decode(token, codSecretoToken.SECRET_KEY);
        if (payload.exp <= moment().unix()){
            return res.status(401).send({ message: 'El token ha expirado'})
        }

        req.user = payload.sub
        next();
    }catch(error){
        return  res.status(401).send({ message: 'El token ha expirado '})
    }
}
module.exports = isPermiso