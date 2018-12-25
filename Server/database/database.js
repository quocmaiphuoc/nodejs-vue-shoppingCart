const mongoose = require('mongoose')
const keys = require('../config/keys')

mongoose.connect(keys.mongodb.mongoURI,()=>{
    console.log(`Connect database success`)
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connect error:'))

module.exports = {
    mongoose
}
