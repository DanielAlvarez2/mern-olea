const mongoose = require('mongoose')

const PixelSchema = new mongoose.Schema({
    pixel:{type:Number}
})

module.exports = mongoose.model('Pixel', PixelSchema)