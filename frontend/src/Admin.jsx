import { useState, useEffect, useContext } from 'react'
import './admin.css'
import PageFooter from './components/PageFooter.jsx'
import AdminDinnerMenuItem from './components/AdminDinnerMenuItem.jsx'
import { FaToggleOff } from "react-icons/fa6"

export default function Admin() {
  const BASE_URL =  (process.env.NODE_ENV == 'production') ?
                    'https://mern-olea.onrender.com' : 
                    'http://localhost:1435'
  const [dinnerItems, setDinnerItems] = useState([])
      
  const getDinnerItems = ()=>{
    fetch(`${BASE_URL}/api/dinner`)
      .then(res=>res.json())
      .then(json=>setDinnerItems(json))
      .catch(err=>console.log(err))
  }

  function deleteDinnerMenuItem(id){
    fetch(`${BASE_URL}/api/dinner/${id}`,{method:'DELETE'})
      .then(res=>res.json(`Item Deleted from Database`))
      .then(()=>getDinnerItems())
      .catch(err=>console.log(err))      
  }



  async function addDinnerItem(formData){
    await fetch(`${BASE_URL}/api/dinner`,{ method:'POST',
                                headers:{'Content-Type':'application/json'},
                                body: JSON.stringify({
                                  section: formData.get('section'),
                                  name: formData.get('name'),
                                  allergies: formData.get('allergies'),
                                  preDescription: formData.get('preDescription'),
                                  description: formData.get('description'),
                                  price: formData.get('price')
                                })
    }).then(console.log(`Added to Database: ${formData.get('name')}`))
      .then(async ()=> await getDinnerItems())
      .catch(err=>console.log(err))
  }

  const [editMode, setEditMode] = useState(false)

  function flipToggle(){
    if(!editMode){
      document.querySelector('#toggle-switch').style.transform = 'rotate(180deg)'
      document.querySelector('#admin-dinner-menu').style.height = 'auto'
      setEditMode(prev=>!prev)
      getDinnerItems()
    }else{
      document.querySelector('#toggle-switch').style.transform = 'rotate(0deg)' 
      document.querySelector('#admin-dinner-menu').style.height = '14in'
      setEditMode(prev=>!prev)
      getDinnerItems()
    } 
  }

  useEffect(()=>getDinnerItems(),[])

  return (
    <>
      <div id='admin-page-wrapper-dinner-menu'>
        
        <div id='admin-header'>
          <span id='admin-page'>Admin Page</span>
          <span id='admin-page-toggle-menu'>
            Print Preview 
            <FaToggleOff id='toggle-switch' onClick={flipToggle} size={30} style={{cursor:'pointer'}} /> 
            Edit Mode
          </span>
          
          <button>Print</button>
        </div>{/* #admin-header */}
        
        <div id='admin-dinner-menu'>
          <h1><span id='logo'>olea</span></h1>
          <hr />

          <div id='admin-dinner-menu-top'>
            <div id='admin-dinner-menu-top-left'>

              <div id='admin-dinner-menu-meats'>
                {dinnerItems.filter(item=>item.section == 'Meats').map(data=>{
                  return <AdminDinnerMenuItem data={data} 
                                              onDeleteClick={()=>deleteDinnerMenuItem(data._id)} 
                                              key={data._id} 
                                              editMode = {editMode} />                  
                })}
              </div>{/* #admin-dinner-menu-meats */}
              
              <div id='admin-dinner-menu-appetizers'>
                {dinnerItems.filter(item=>item.section == 'Appetizers').map(data=>{
                  return <AdminDinnerMenuItem data={data} 
                                              onDeleteClick={()=>deleteDinnerMenuItem(data._id)} 
                                              key={data._id}
                                              editMode = {editMode} />
                })}
                
              </div>{/* #admin-dinner-menu-appetizers */}
            </div>{/* #admin-dinner-menu-top-left */}

            <div id='admin-dinner-menu-top-right'>
              {dinnerItems.filter(item=>item.section == 'Entrées').map(data=>{
                  return <AdminDinnerMenuItem data={data} 
                                              onDeleteClick={()=>deleteDinnerMenuItem(data._id)} 
                                              key={data._id}
                                              editMode = {editMode} />
                })}
            </div>{/* #admin-dinner-menu-top-right */}

          </div>{/* #admin-dinner-menu-top */}

          <h2>sides</h2>
          <div id='admin-dinner-menu-sides'>
              {dinnerItems.filter(item=>item.section == 'Sides').map(data=>{
                  return <AdminDinnerMenuItem data={data} 
                                              onDeleteClick={()=>deleteDinnerMenuItem(data._id)} 
                                              key={data._id}
                                              editMode = {editMode} /> 
              })}
          </div>{/* #admin-dinner-menu-sides */}          
        </div>{/* #admin-dinner-menu */}



















        <div id='admin-form-outer-wrapper'>
          <div id='admin-form-inner-wrapper'>
            <form action={addDinnerItem} id='admin-form'>
              <h2>Create New Item</h2><br/>

              <label>
                Section:&nbsp;&nbsp; 
                <select name='section'>
                  <option>Section...</option>
                  <option>Meats</option>
                  <option>Appetizers</option>
                  <option>Entrées</option>
                  <option>Sides</option>
                </select><br/><br/>
              </label>

              <label>
                Name:<br/>
                <input type='text' name='name' /><br/><br/>
              </label>

              <label>
                Allergies:<br/>
                <input type='text' name='allergies' /><br/><br/>
              </label>

              <label>
                Mini-Description:<br/>
                <input type='text' name='preDescription' /><br/><br/>
              </label>

              <label>
                Main Description:<br/>
                <textarea name='description' rows='5'></textarea><br/><br/>
              </label>

              <label>
                Price:<br/>
                <input type='text' name='price' autoComplete='off' /><br/><br/>
              </label>

              <label>
                Photo: (optional)<br/>
                <input type='file' name='image' /><br/><br/>
              </label>

              <button type='submit' className='admin-form-btn'>Add Item</button>

              <div className='admin-form-btn'>Clear Form</div>

            </form>{/* #admin-form */}
          </div>{/* #admin-form-inner-wrapper */}
        </div>{/* #admin-form-outer-wrapper */}      
        <PageFooter color='blue' />
      </div>{/* #page-wrapper-admin-dinner-menu */}
    </>
  )
}
