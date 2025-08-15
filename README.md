# MERN Stack Template - Restaurant    

GitHub:  
Click pfp in upper right corner  
Your repositories  
New  
Repository name *  
Create repository  
Copy new repo URL "https://github.com/DanielAlvarez2/???????.git"  

VS Code:  
File > New Window  
$ cd desktop  
$ git clone Command + V to paste new GitHub Repo URL  
Open Folder Icon  
Open Folder of New GitHub Repo  
$ touch .gitignore  
.gitignore:  
    .env  
    /node_modules  
        
$ git config user.name 'Daniel Alvarez'  
$ git config user.email 'daniel.yllanes@hotmail.com'  
$ git add .  
$ git commit -m 'initial commit'  
$ git push  
$ mkdir backend  
$ mkdir frontend  
Control + `  
$ cd backend  
/backend $ npm init -y  
/backend/package.json created  
/backend $ npm i cloudinary cors express mongoose 
/backend $ touch server.js  
  
/backend/server.js:  
```
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

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

const PORT = process.env.PORT || 1435 
app.listen(PORT, ()=> console.log(`Server Listening on Port: ${PORT}`))
```
mongodb.com:  
Connect > Drivers > Copy URL  
.env:  
COMMENT_PORT=1435  
MONGODB_URI=mongodb+srv://danielalvarez:<db_password>@cluster0.4bkm3yq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0  
Replace <db_password> with actual password  
Between / ?  write in the name of GitHub Repo  
/backend $ node --watch --env-file=../.env server.js  
Control + C 
$ cd ..   
$ git add  
$ git commit -m 'server listening, database connected'  
$ git push  
$ cd backend  
/backend $ mkdir models  
/backend $ cd models  
/backend/models $ touch DinnerMenuItem.js    
  
/backend/models/DinnerMenuItem.js:  
```
const mongoose = require('mongoose')

const DinnerMenuItemSchema = new mongoose.Schema({
    section:{type:String},
    name:{type:String},
    description:{type:String},
    price:{type:String},
    sequence:{type:Number}
},{timestamps:true})

module.exports = mongoose.model('DinnerMenuItem', DinnerMenuItemSchema)
```
  
/backend/server.js:  
```
const DinnerMenuItem = require('./models/DinnerMenuItem.js')
 
app.post('/api/dinner', async(requestAnimationFrame,res)=>{
    try{
        const maxSequence = await DinnerMenuItem.findOne({section:requestAnimationFrame.body.section}).sort({sequence:-1})
        await DinnerMenuItem.create({
            section:req.body.section,
            name:req.body.name,
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
```  
/backend $ node --watch --env-file=../.env server.js  
  
Postman:  
Select HTTP Method from Dropdown: POST  
URL: http://localhost:1435/api/dinner  
Body > raw > JSON  
```
{
    "section":"appetizers",
    "name":"salad",
    "description":"leafy",
    "price":"$20"
}
```
Send  
mongodb.com confirm POST is succesful  
Create 3 Terminal Windows for /backend /frontend /git    
$ git add .  
$ git commit -m 'express api POST working'  
$ git push  
  
/backend/server.js:  
```
app.delete('/api/dinner/:id', async(req,res)=>{
    try{
        await DinnerMenuItem.findByIdAndDelete(req.params.id)
        console.log('Item Deleted from Database')
        res.json('Item Deleted from Database')
    }catch(err){
        console.log(err)
    }
})
```  
  
Postman:  
Select HTTP Method from Dropdown: DELETE  
URL: http://localhost:1435/api/dinner/687fbbd89ad2fed262303220  
Send  
mongodb.com: confirm DELETE working  
  
$ git add .  
$ git commit -m 'express api DELETE working'  
$ git push  
  
Postman:
Select HTTP Method from Dropdown: POST  
URL: http://localhost:1435/api/dinner  
Body > raw > JSON:  
```
{
    "section":"appetizers",
    "name":"salad",
    "description":"leafy",
    "price":"$20"
}
```
Send  
```
{
    "section":"appetizers",
    "name":"soup",
    "description":"liquid",
    "price":"$10"
}
```
Send  
mongodb.com: confirm 2 entries  
  
/backend/server.js:  
```
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
```  
  
Postman:  
Select HTTP Method from Dropdown: GET  
URL: http://localhost:1435/api/dinner  
Send  
Should get back TWO entries  
Copy the "_id" of ONE entry  
URL: http://localhost:1435/api/dinner/687fbf67b6ba93e8230f438a  
Send  
Should get back ONE entry  
    
$ git add .  
$ git commit -m 'express api GET ONE/GET ALL working'  
$ git push  
  
/backend/server.js:  
```
app.put('/api/dinner/:id', async(req,res)=>{
    try{
        await DinnerMenuItem.findByIdAndUpdate({_id:req.params.id},{
            section:req.body.section,
            name:req.body.name,
            description:req.body.description,
            price:req.body.price
        })
        console.log(`Updated in Database: ${req.body.name}`)
        res.json(`Updated in Databse: ${req.body.name}`)
    }catch(err){
        console.log(err)
    }
})
```
  
Postman:  
Select HTTP Method from Dropdown: PUT  
URL: http://localhost:1435/api/dinner/687fbf67b6ba93e8230f438a  
Body > raw > JSON  
```
{
    "section":"appetizers",
    "name":"wings",
    "description":"spicy",
    "price":"$30"
}
```
Send  
mongodb.com: confirm item updated  
$ git add .  
$ git commit -m 'express api fully functional'  
$ git push  
  
/frontend $ npm create vite@latest .  
+ React  
+ JavaScript  
/frontend $ npm i  
/frontend $ npm run dev  
Command + click URL  
/frontend/src/App.css: delete ALL contents  
/frontend/src/index.css: delete ALL contents  

/frontend/vite.config.js  
```
export default defineConfig({  
  plugins: [react()],  
  server:{  
    proxy:{  
      '/api':'http://localhost:####'  /BACKEND PORT/   
    }  
  }  
})  
```
    
/frontend/src/App.jsx  
```
import { useState, useEffect } from 'react'  

export default function App() {  
  const [dinnerItems, setDinnerItems] = useState([]) 

  const getDinnerItems = ()=>{  
    fetch('api/dinner')  
      .then(res=>res.json())  
      .then(json=>setDinnerItems(json))  
      .catch(err=>console.log(err))  
  }

  useEffect(()=>getDinnerItems(),[])  

  return (  
    <>  
      {dinnerItems.map(data=>{  
        return(  
          <div>  
            {data.name}  
          </div>  
        )  
      })}  
    </>  
  )  
}  
```
Confirm menu items displaying in browser  
$ git add .  
$ git commit -m 'frontend displaying database from backend'  
$ git push  
   
Render.com  
\+ Add New > Web Service  
Select GitHub Repo from Dropdown Menu  
Root Directory: ./backend  
Build Command: backend/ $ npm install  
Start Command: backend/ $ node server.js  
Select: "Free $0/month"  
Environment Variables: MONGODB_URI copy from .env file  
DEPLOY WEB SERVICE  
Maximize Logs  
Wait for: "Your service is live"  
  
/frontend/src/App.jsx  
```
export default function App() {
  const BASE_URL =  (process.env.NODE_ENV == 'production') ? 
                    'https://mern-template-restaurant.onrender.com' : 
                    'http://localhost:1435'
  const getDinnerItems = ()=>{
    fetch(`${BASE_URL}/api/dinner`)
```
$ git add .  
$ git commit -m 'add BASE_URL from Render.com in App.jsx fetch'   
$ git push  
  
Netlify.com  
Add new project > Import an existing project  
Select GitHub  
Select Repo  
Project Name: defaults to silly name  
Base directory: frontend  
Build command: npm run build  
Publish directory: frontend/dist  
Add environment variables > Add key/value pairs  
Key: REACT_APP_BACKEND_URL  
Value: copy url from Render  
Click Deploy  
Wait for: "Your project is deployed"  
Click on URL  
Confirm Netlify is displaying Database from Render.com  
  
/frontend $ npm i react-router  
/frontend/src \+CREATE NEW FILE: touch Test.jsx   
/frontend/src/Test.jsx  
```. 
export default function Test(){
    return <h1>TEST PAGE</h1>
}
```
  
/frontend/src/main.jsx:  
```
import ReactDOM from 'react-dom/client'
import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router'
import App from './App.jsx'
import Test from './Test.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='test' element={<Test />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
```
/frontend/public/ \+CREATE NEW FILE: _redirects `/* /index.html 200`  
    
$ git add .  
$ git commit -m 'configure react-router'  
$ git push  

Netlify: wait for deploy to go live  
navigate to Netlify URL/test  


ADD ENVIRONMENT VARIABLES IN NETLIFY FOR CLOUDINARY  

**********************************************************
  BELOW MAY NOT BE NEEDED/TRY WITHOUT:
ADD ENVIRONMENT VARIABLES TO RENDER ACCOUNT:  
Manage > Environment > Edit  > \+ Add > From .env  
Command + C > Command + V  
Add variables  
Save, rebuild, and redeploy  
**********************************************************
  
LESS THAN 3 HOURS TO COMPLETE   
  
Print README.md from GitHub Repo URL in PrintFriendly.com  
  
webutility.io/favicon-extractor  
16x16px  
32x32px  
96x96px  
256x256px  
  



https://www.ionos.com/tools/favicon-generator  

FONTS:  
/frontend/src/assets/ $ mkdir fonts  
save fonts to this folder  
/frontend/src/index.css:  
```
@font-face{
  font-family: 'FuturaLight';
  src:url('./assets/fonts/FuturaLight.otf');
}
@media print{
  .no-print{
      display:none !important;
      height:0;
      width:0;
  }
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1{
  font-family: FuturaLight;
}
```
  
DNS Records:  
  
Netlify:  
Domains > oleademo.com > Name Servers:  
dns1.p08.nsone.net  
dns2.p08.nsone.net  
dns3.p08.nsone.net  
dns4.p08.nsone.net  
  
Ionos:  
Domains & SSL  
oleademo.com  
"Name Server" tab  
Use custom name servers  
fill in info from Netlify  
Save  
"Name server succesfully changed"  
Works immediately  
HTTPS takes a few minutes to kick in  
may take 48 hours for "oleademo.com" to work glitch-free  


  
*******************************************  
OPTIMIZATIONS  
*******************************************  
  
img alt tags = menu item name  
make form responsive / 2-columns on desktop mode  
make nam/price input fields required in form jsx  
svh to fix grid centered form too low  
make form into REUSABLE component  
rename Admin to Office  
button spinners while loading  
pics page  
mvc  
clean up inline css  
mobile view form for add / edit  
BUY: menudemo.com  
create a page for all staff to quickly view the current printed menus: /staff  
      (with height:auto, not fixed)  
oleademo.com not working in incognito mode??? inspect at BestBuy  
add long allergy descriptions to schema and forms and display  
add a key to allergies page lower-case vs UPPER-CASE position:fixed, bottom of screen    
add ADDITIONAL route for /allergies    
observe react effect to explain  


*******************************************  
SALES PITCH  
*******************************************  
asians who can't read any english appreciate the pics  
old people asking for "reading glasses"  
elderly father: daughter was reading the entire menu to him out loud. pics helped  
people often use the flashlight feature on their phones to read the menu in dim lighting  
more detailed and comprehensive allergy descriptions  
daily specials viewable online  
initially: don't write any text with the QR-Code. Only have servers explain it when needed  
show bug fix on top nav transition sizes from desktop to mobile WAS poorly designed  
show improvement of open table section position:sticky fixes awkward EMPTY right half of screen  
