const mongoose = require('mongoose')

const DinnerMenuItemSchema = new mongoose.Schema({
    section:{type:String},
    name:{type:String},
    allergies:{type:String},
    preDescription:{type:String},
    description:{type:String},
    price:{type:String},
    sequence:{type:Number}
},{timestamps:true})

module.exports = mongoose.model('DinnerMenuItem', DinnerMenuItemSchema)