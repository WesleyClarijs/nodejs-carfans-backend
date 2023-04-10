const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.user
const jwtSecretKey = require('../config/db.config').jwtSecretKey



const authenticate = async (req, res, next) => {
    try{
        console.log(req.header('Authorization'))
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, jwtSecretKey)
        try {
            const user = await User.findOne({id: data.id})
            console.log(user)
            if(!user) {
                throw new Error()
            }
            req.user = user
            req.accessToken = token
            console.log(user)
            next()
        } catch (error){
            res.status(403).send({error: 'Not authorized to acces this resource'})
        }
    } catch (error){
        res.status(403).send({error: 'Incorrect token'})
    }

}

module.exports = authenticate