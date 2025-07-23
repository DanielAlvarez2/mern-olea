const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const DinnerMenuItem = require('./models/DinnerMenuItem.js')

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

app.delete('/api/dinner/:id', async(req,res)=>{
    try{
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

const PORT = process.env.PORT || 1435 
app.listen(PORT, ()=> console.log(`Server Listening on Port: ${PORT}`))