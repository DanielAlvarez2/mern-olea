const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const DinnerMenuItem = require('./models/DinnerMenuItem.js')
const Pixel = require('./models/Pixel.js')
const {cloudinary} = require('./utils/cloudinary.js')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

console.log(''); //SEMICOLON REQUIRED BEFORE IIFE!!!!
(async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database Connected')
    }catch(err){
        console.log(err)
    }
})()

app.post('/api/dinner', async(req,res)=>{
    try{
        const maxSequence = await DinnerMenuItem.findOne({section:req.body.section}).sort({sequence:-1})
        await DinnerMenuItem.create({
            section:req.body.section,
            name:req.body.name,
            allergies:req.body.allergies,
            preDescription:req.body.preDescription,
            description:req.body.description,
            price:req.body.price,
            sequence: maxSequence ? maxSequence.sequence + 1 : 1
        })
        console.log(`Added to Database:${req.body.name}`)
        res.json(`Added to Database: ${req.body.name}`)
    }catch(err){
        console.log(err)
    }
})
app.put('/api/UNarchive/:id',async(req,res)=>{
    target = await DinnerMenuItem.findById(req.params.id)
    last = await DinnerMenuItem.findOne({section:target.section}).sort({sequence:-1})
    await DinnerMenuItem.findByIdAndUpdate({_id:target._id},{sequence:last.sequence + 1})
    res.json('Item UN-archived')
})
app.delete('/api/archive/:id',async(req,res)=>{
    try{
        await DinnerMenuItem.findByIdAndDelete(req.params.id)
        res.json('Item Deleted from Archive')
    }catch(err){    
        console.log(err)
    }
})
app.delete('/api/dinner/:id', async(req,res)=>{
    try{

        const target = await DinnerMenuItem.findById(req.params.id)
        const max = await DinnerMenuItem.findOne({section:target.section}).sort({sequence:-1})
        for(let i=target.sequence;i<=max.sequence;i++){
            await DinnerMenuItem.findOneAndUpdate({section:target.section,sequence:i},{sequence:i-1})
        }

        await DinnerMenuItem.findByIdAndDelete(req.params.id)
        console.log('Item Deleted from Database')
        res.json('Item Deleted from Database')
    }catch(err){
        console.log(err)
    }
})

app.get('/api/dinner', async(req,res)=>{
    try{
        const allDinnerItems = await DinnerMenuItem.find().sort({sequence:1})
        res.json(allDinnerItems)
    }catch(err){
        console.log(err)
    }
})
app.get('/api/dinner/:id', async(req,res)=>{
    try{
        const dinnerItem = await DinnerMenuItem.findById(req.params.id)
        console.log(dinnerItem)
        res.json(dinnerItem)
    }catch(err){
        console.log(err)
    }
})

app.put('/api/dinner/:id', async(req,res)=>{
    try{
        await DinnerMenuItem.findByIdAndUpdate({_id:req.params.id},{
            section:req.body.section,
            name:req.body.name,
            allergies:req.body.allergies,
            preDescription:req.body.preDescription,
            description:req.body.description,
            price:req.body.price
        })
        console.log(`Updated in Database: ${req.body.name}`)
        res.json(`Updated in Databse: ${req.body.name}`)
    }catch(err){
        console.log(err)
    }
})

app.get('/api/increaseHorizontal', async(req,res)=>{
    try{
        let target = await Pixel.findOne({name:'horizontalWhitespace'})
        target  ? await Pixel.findByIdAndUpdate({_id:target._id},{pixels:target.pixels + 1}) 
                : await Pixel.create({name:'horizontalWhitespace',pixels:1})
        target = await Pixel.findOne({name:'horizontalWhitespace'})
        console.log(`Horizontal Whitespace: ${target.pixels}px`)
        res.json(target.pixels)
    }catch(err){
        console.log(err)
    }
})
app.get('/api/increaseVertical', async(req,res)=>{
    try{
        let target = await Pixel.findOne({name:'verticalWhitespace'})
        target  ? await Pixel.findByIdAndUpdate({_id:target._id},{pixels:target.pixels + 1}) 
                : await Pixel.create({name:'verticalWhitespace',pixels:1})
        target = await Pixel.findOne({name:'verticalWhitespace'})
        console.log(`Vertical Whitespace: ${target.pixels}px`)
        res.json(target.pixels)
    }catch(err){
        console.log(err)
    }
})
app.get('/api/decreaseHorizontal', async(req,res)=>{
    try{
        let target = await Pixel.findOne({name:'horizontalWhitespace'})
        if (target.pixels == 0){
            res.json(0)
        }else{
            target  ? await Pixel.findByIdAndUpdate({_id:target._id},{pixels:target.pixels - 1}) 
                    : await Pixel.create({name:'horizontalWhitespace',pixels:1})
            target = await Pixel.findOne({name:'horizontalWhitespace'})
            console.log(`Horizontal Whitespace: ${target.pixels}px`)
            res.json(target.pixels)
        }
    }catch(err){
        console.log(err)
    }
})
app.get('/api/decreaseVertical', async(req,res)=>{
    try{
        let target = await Pixel.findOne({name:'verticalWhitespace'})
        if (target.pixels == 0){
            res.json(0)
        }else{
            target  ? await Pixel.findByIdAndUpdate({_id:target._id},{pixels:target.pixels - 1}) 
                    : await Pixel.create({name:'verticalWhitespace',pixels:1})
            target = await Pixel.findOne({name:'verticalWhitespace'})
            console.log(`Vertical Whitespace: ${target.pixels}px`)
            res.json(target.pixels)
        }
    }catch(err){
        console.log(err)
    }
})

app.get('/api/verticalWhitespace',async(req,res)=>{
    try{
        let target = await Pixel.findOne({name:'verticalWhitespace'})
        res.json(target ? target.pixels : 0)
    }catch(err){
        console.log(err)
    }
})

app.get('/api/horizontalWhitespace',async(req,res)=>{
    try{
        let target = await Pixel.findOne({name:'horizontalWhitespace'})
        res.json(target ? target.pixels : 0)
    }catch(err){
        console.log(err)
    }
})

app.get('/api/moveUp/:id', async(req,res)=>{
    const target = await DinnerMenuItem.findById(req.params.id)
    const swap = await DinnerMenuItem.findOne({section:target.section, sequence:target.sequence - 1})
    const targetSequence = target.sequence
    const swapSequence = swap.sequence
    await DinnerMenuItem.findByIdAndUpdate({_id:req.params.id},{sequence:swapSequence})
    await DinnerMenuItem.findByIdAndUpdate({_id:swap._id},{sequence:targetSequence})
    console.log('Item Moved Up')
    res.json('Item Moved Up')
})

app.get('/api/moveDown/:id', async(req,res)=>{
    const target = await DinnerMenuItem.findById(req.params.id)
    const swap = await DinnerMenuItem.findOne({section:target.section, sequence:target.sequence + 1})
    const targetSequence = target.sequence
    const swapSequence = swap.sequence
    await DinnerMenuItem.findByIdAndUpdate({_id:req.params.id},{sequence:swapSequence})
    await DinnerMenuItem.findByIdAndUpdate({_id:swap._id},{sequence:targetSequence})
    console.log('Item Moved Down')
    res.json('Item Moved Down')
})

app.get('/api/archive/:id', async(req,res)=>{
    const target = await DinnerMenuItem.findById(req.params.id)
    const sectionLast = await DinnerMenuItem.findOne({section:target.section}).sort({sequence:-1})
    for (let i=target.sequence+1;i<=sectionLast.sequence;i++){
        await DinnerMenuItem.findOneAndUpdate({section:target.section,sequence:i},{sequence:i-1})
    }
    await DinnerMenuItem.findByIdAndUpdate({_id:target._id},{sequence:0})
    res.json(`${target.name} has been Archived`)
})

const PORT = process.env.PORT || 1435 
app.listen(PORT, ()=> console.log(`Server Listening on Port: ${PORT}`))