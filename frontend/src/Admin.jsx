import { useState, useEffect, useContext } from 'react'
import './admin.css'
import PageFooter from './components/PageFooter.jsx'
import AdminDinnerMenuItem from './components/AdminDinnerMenuItem.jsx'
import { FaToggleOff } from "react-icons/fa6"
import { FaCaretSquareUp } from "react-icons/fa"

export default function Admin() {
  const BASE_URL =  (process.env.NODE_ENV == 'production') ?
                    'https://mern-olea.onrender.com' : 
                    'http://localhost:1435'
  const [dinnerItems, setDinnerItems] = useState([])
  const [editForm,setEditForm] = useState(false)
  const [whitespaceVertical, setWhitespaceVertical] = useState(0)
  const [whitespaceHorizontal, setWhitespaceHorizontal] = useState(0)
      
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

  async function editDinnerItem(formData){
    await fetch(`${BASE_URL}/api/dinner/${formData.get('id')}`,{method:'PUT',
                                                                headers:{'Content-Type':'application/json'},
                                                                body: JSON.stringify({
                                                                  section: formData.get('section'),
                                                                  name: formData.get('name'),
                                                                  allergies: formData.get('allergies'),
                                                                  preDescription: formData.get('preDescription'),
                                                                  description: formData.get('description'),
                                                                  price: formData.get('price')
                                                                })
    }).then(console.log(`Updated ${formData.get('name')}`))
      .then(setEditForm(false))
      .then(async()=>await getDinnerItems())
      .catch(err=>console.log(err))
  }

  function increaseVerticalWhitespace(){
    
  }

  async function populateForm(id){
    let target
    setEditForm(true)
    await fetch(`${BASE_URL}/api/dinner/${id}`)
            .then(res=>res.json())
            .then(json=> target = json)
            .catch(err=>console.log(err))
    document.querySelector('#admin-page-id-input').value = target._id
    document.querySelector('#admin-page-section-input').value = target.section
    document.querySelector('#admin-page-name-input').value = target.name
    document.querySelector('#admin-page-allergies-input').value = target.allergies
    document.querySelector('#admin-page-pre-description-input').value = target.preDescription
    document.querySelector('#admin-page-main-description-input').value = target.description
    document.querySelector('#admin-page-price-input').value = target.price
    document.querySelector('#admin-form').scrollIntoView({behavior:'smooth'})
  }

  const [editMode, setEditMode] = useState(false)

  function flipToggle(){
    if(!editMode){
      document.querySelector('#toggle-switch').style.transform = 'rotate(180deg)'
      document.querySelector('#admin-dinner-menu').style.height = 'auto'
      document.querySelector('#admin-page-print-button').style.zIndex = '-10'
      document.querySelector('#admin-page-print-button').style.visibility = 'hidden'
      document.querySelector('#whitespace-controls').style.visibility = 'hidden'
      setEditMode(prev=>!prev)
      getDinnerItems()
    }else{
      document.querySelector('#whitespace-controls').style.visibility = 'visible'
      document.querySelector('#toggle-switch').style.transform = 'rotate(0deg)' 
      document.querySelector('#admin-dinner-menu').style.height = '14in'
      document.querySelector('#admin-page-print-button').style.zIndex = '10'
      document.querySelector('#admin-page-print-button').style.visibility = 'visible'
      setEditMode(prev=>!prev)
      getDinnerItems()
    } 
  }
  function clearForm(){
    setEditForm(false)
    document.querySelector('#admin-page-id-input').value = ''
    document.querySelector('#admin-page-section-input').value = ''
    document.querySelector('#admin-page-name-input').value = ''
    document.querySelector('#admin-page-allergies-input').value = ''
    document.querySelector('#admin-page-pre-description-input').value = ''
    document.querySelector('#admin-page-main-description-input').value = ''
    document.querySelector('#admin-page-price-input').value = ''
  }

  useEffect(()=>getDinnerItems(),[])

  return (
    <>
      <div id='admin-page-wrapper-dinner-menu'>
        
        <div id='admin-header'>
          <div id='admin-header-content'>
            <span id='admin-page'>Admin Page</span>

            <span id='admin-page-toggle-menu'>
              Print Preview 
              <FaToggleOff id='toggle-switch' onClick={flipToggle} size={30} style={{cursor:'pointer'}} /> 
              Edit Mode
            </span>
            
            <button id='admin-page-print-button'>Print</button>
          </div>{/* #admin-header-content */}
          <div id='whitespace-controls'>
            <span id='whitespace-vertical'>
              <FaCaretSquareUp  onClick={increaseVerticalWhitespace} 
                                style={{transform:'rotate(0deg)',cursor:'pointer'}} />
              <span>{whitespaceVertical}</span>
              <FaCaretSquareUp style={{transform:'rotate(180deg)',cursor:'pointer'}} />
            </span>{/* #whitespace-vertical */}
            <span>WHITESPACE</span> 
            <span id='whitespace-horizontal'>
              <FaCaretSquareUp style={{transform:'rotate(270deg)',cursor:'pointer'}} />
              <span>&nbsp;{whitespaceHorizontal}&nbsp;</span>
              <FaCaretSquareUp style={{transform:'rotate(90deg)',cursor:'pointer'}} />
            </span>{/* #whitespace-horizontal */}
          </div>{/* #whitespace-control */}
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
                                              onEditClick={()=>populateForm(data._id)}
                                              key={data._id} 
                                              editMode = {editMode} />                  
                })}
              </div>{/* #admin-dinner-menu-meats */}
              
              <div id='admin-dinner-menu-appetizers'>
                {dinnerItems.filter(item=>item.section == 'Appetizers').map(data=>{
                  return <AdminDinnerMenuItem data={data} 
                                              onDeleteClick={()=>deleteDinnerMenuItem(data._id)} 
                                              onEditClick={()=>populateForm(data._id)}
                                              key={data._id}
                                              editMode = {editMode} />
                })}
                
              </div>{/* #admin-dinner-menu-appetizers */}
            </div>{/* #admin-dinner-menu-top-left */}

            <div id='admin-dinner-menu-top-right'>
              {dinnerItems.filter(item=>item.section == 'Entrées').map(data=>{
                  return <AdminDinnerMenuItem data={data} 
                                              onDeleteClick={()=>deleteDinnerMenuItem(data._id)} 
                                              onEditClick={()=>populateForm(data._id)}
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
                                              onEditClick={()=>populateForm(data._id)}
                                              key={data._id}
                                              editMode = {editMode} /> 
              })}
          </div>{/* #admin-dinner-menu-sides */}          
        </div>{/* #admin-dinner-menu */}

















{/* FORM */}

        <div id='admin-form-outer-wrapper'>
          <div id='admin-form-inner-wrapper'>
            <form action={ editForm ? editDinnerItem : addDinnerItem} id='admin-form'>
              <h2>{editForm ? 'Edit' : 'Create New'} Item</h2><br/>

              <input type='hidden' name='id' id='admin-page-id-input' />
              <label>
                Section:&nbsp;&nbsp; 
                <select id='admin-page-section-input' name='section' defaultValue=''>
                  <option value='' disabled>Section...</option>
                  <option>Meats</option>
                  <option>Appetizers</option>
                  <option>Entrées</option>
                  <option>Sides</option>
                </select><br/><br/>
              </label>

              <label>
                Name:<br/>
                <input id='admin-page-name-input' type='text' name='name' /><br/><br/>
              </label>

              <label>
                Allergies:<br/>
                <input id='admin-page-allergies-input' type='text' name='allergies' /><br/><br/>
              </label>

              <label>
                Mini-Description:<br/>
                <input id='admin-page-pre-description-input' type='text' name='preDescription' /><br/><br/>
              </label>

              <label>
                Main Description:<br/>
                <textarea id='admin-page-main-description-input' name='description' rows='5'></textarea><br/><br/>
              </label>

              <label>
                Price:<br/>
                <input id='admin-page-price-input' type='text' name='price' autoComplete='off' /><br/><br/>
              </label>

              <label>
                Photo: (optional)<br/>
                <input type='file' name='image' /><br/><br/>
              </label>

              <button type='submit' 
                      style={{color:'white',background: editForm ? 'blue' : 'green'}}
                      className='admin-form-btn'>{editForm ? 'Edit' : 'Add'} Item</button>

              <div onClick={clearForm} className='admin-form-btn'>Clear Form</div>

            </form>{/* #admin-form */}
          </div>{/* #admin-form-inner-wrapper */}
        </div>{/* #admin-form-outer-wrapper */}
{/* END FORM */}      
        <PageFooter color='blue' />
      </div>{/* #page-wrapper-admin-dinner-menu */}
    </>
  )
}
