const mongoose = require('mongoose')

const PixelSchema = new mongoose.Schema({
    name:{type:String},
    pixels:{type:Number}
})

module.exports = mongoose.model('Pixel', PixelSchema)