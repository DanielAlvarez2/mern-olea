import { useState, useEffect } from 'react'
import './admin.css'
import PageFooter from './components/PageFooter.jsx'
import AdminDinnerMenuItem from './components/AdminDinnerMenuItem.jsx'
import ArchiveDinnerMenuItem from './components/ArchiveDinnerMenuItem.jsx'
import { FaToggleOff } from "react-icons/fa6"
import { FaCaretSquareUp } from "react-icons/fa"
import { MdDoNotDisturb } from "react-icons/md"


export default function Admin() {
  const BASE_URL =  (process.env.NODE_ENV == 'production') ?
                    'https://mern-olea.onrender.com' : 
                    'http://localhost:1435'
  const [dinnerItems, setDinnerItems] = useState([])
  const [editForm,setEditForm] = useState(false)
  const [whitespaceVertical, setWhitespaceVertical] = useState(0)
  const [whitespaceHorizontal, setWhitespaceHorizontal] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [archiveLength, setArchiveLength] = useState(0)
  const [previewSource, setPreviewSource] = useState('')
  const [oldPic,setOldPic] = useState(false)
  const [oldPicURL, setOldPicURL] = useState('')
  const [oldPicID, setOldPicID] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  useEffect(()=>getVerticalWhitespace(),[])
  useEffect(()=>getHorizontalWhitespace(),[])
  useEffect(()=>getDinnerItems(),[])

  function handleFileInputChange(e){
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file) // converts binary image file to a string
    reader.onloadend = ()=> setPreviewSource(reader.result)
    console.log(previewSource)
  }

  function toggleCheckbox(){
    document.querySelector('#do-not').style.color = isChecked ? 'transparent' : 'red'
    document.querySelector('#main-photo').style.visibility = isChecked ? 'visible' : 'hidden'
    document.querySelector('#image-binary').value = ''
    setIsChecked(prev=>!prev)
    setPreviewSource('')
  }

  function getHorizontalWhitespace(){
    fetch(`${BASE_URL}/api/horizontalWhitespace`)
      .then(res=>res.json())
      .then(json=>setWhitespaceHorizontal(json))
      .catch(err=>console.log(err))
  }
  
  function getVerticalWhitespace(){
    fetch(`${BASE_URL}/api/verticalWhitespace`)
      .then(res=>res.json())
      .then(json=>setWhitespaceVertical(json))
      .catch(err=>console.log(err))
  }

  async function increaseHorizontalWhitespace(){
    await fetch(`${BASE_URL}/api/increaseHorizontal`)
            .then(res=>res.json())
            .then(px=>setWhitespaceHorizontal(px))
            .catch(err=>console.log(err))
  }

  async function increaseVerticalWhitespace(){
    await fetch(`${BASE_URL}/api/increaseVertical`)
            .then(res=>res.json())
            .then(px=>setWhitespaceVertical(px))
            .catch(err=>console.log(err))
  }

  async function decreaseHorizontalWhitespace(){
    await fetch(`${BASE_URL}/api/decreaseHorizontal`)
            .then(res=>res.json())
            .then(px=>setWhitespaceHorizontal(px))
            .catch(err=>console.log(err))
  }
  async function decreaseVerticalWhitespace(){
    await fetch(`${BASE_URL}/api/decreaseVertical`)
            .then(res=>res.json())
            .then(px=>setWhitespaceVertical(px))
            .catch(err=>console.log(err))
  }

  const getDinnerItems = ()=>{
    fetch(`${BASE_URL}/api/dinner`)
      .then(res=>res.json())
      .then(json=>setDinnerItems(json))
      .catch(err=>console.log(err))
    setArchiveLength(dinnerItems.filter(item=>item.sequence == 0).length)
    }

  function deleteArchivedMenuItem(id){
    fetch(`${BASE_URL}/api/archive/${id}`,{method:'DELETE'})
      .then(res=>res.json('Item Deleted from Archive'))
      .then(()=>getDinnerItems())
      .catch(err=>console.log(err))
  }

  function deleteDinnerMenuItem(id,name){
    // BELOW: empty line is intentional. Do not remove!!!
    let doubleCheck = confirm(`Are you sure you want to permanently delete:
      
      ${name}`)
    // ABOVE: empty line is intentional. Do not remove!!!
    if (doubleCheck){
      fetch(`${BASE_URL}/api/dinner/${id}`,{method:'DELETE'})
        .then(res=>res.json(`Item Deleted from Database`))
        .then(()=>getDinnerItems())
        .catch(err=>console.log(err))      
    }else{
      return
    }

  }

  async function addDinnerItem(formData){
    document.querySelector('#admin-page-form-submit-button').textContent = 'Uploading...'
    document.querySelector('#admin-page-form-submit-button').disabled = true
    document.querySelector('#admin-page-form-submit-button').style.cursor = 'wait'
    document.querySelector('#admin-page-form-submit-button').style.background = 'black'
   
    let cloudinary_assigned_url = ''
    let cloudinary_assigned_public_id = ''

    if (previewSource){
      await fetch(`${BASE_URL}/api/upload-cloudinary`,{ method:'POST',
                                                        body:JSON.stringify({data:previewSource}),
                                                        headers:{'Content-type':'application/json'}
      }).then(async(res)=>await res.json())
        .then(async(json)=>{
          cloudinary_assigned_url = json.secure_url
          cloudinary_assigned_public_id = json.public_id
        })
        .catch(err=>console.log(err))
    }

    await fetch(`${BASE_URL}/api/dinner`,{ method:'POST',
                                headers:{'Content-Type':'application/json'},
                                body: JSON.stringify({
                                  section: formData.get('section'),
                                  name: formData.get('name'),
                                  allergies: formData.get('allergies'),
                                  preDescription: formData.get('preDescription'),
                                  description: formData.get('description'),
                                  price: formData.get('price'),
                                  cloudinary_url:cloudinary_assigned_url,
                                  cloudinary_public_id:cloudinary_assigned_public_id
                                })
    }).then(console.log(`Added to Database: ${formData.get('name')}`))
      .then(async ()=> await getDinnerItems())
      .catch(err=>console.log(err))
    clearForm()
    closeForm()
    document.querySelector('#admin-page-form-submit-button').textContent = 'Add Item'
    document.querySelector('#admin-page-form-submit-button').disabled = false
    document.querySelector('#admin-page-form-submit-button').style.cursor = 'pointer'
    document.querySelector('#admin-page-form-submit-button').style.background = 'green'
  }

  async function editDinnerItem(formData){
    document.querySelector('#admin-page-form-submit-button').style.background = 'black'
    document.querySelector('#admin-page-form-submit-button').style.cursor = 'wait'
    document.querySelector('#admin-page-form-submit-button').textContent = 'Uploading...'
    document.querySelector('#admin-page-form-submit-button').disabled = true
    let cloudinary_assigned_url = ''
    let cloudinary_assigned_public_id = ''

    // NO PIC --> NO PIC
    if (!previewSource && !formData.get('admin-page-existing-cloudinary-url')){
      cloudinary_assigned_url = formData.get('admin-page-existing-cloudinary-url')
      cloudinary_assigned_public_id = formData.get('admin-page-existing-cloudinary-public-id')
    }

    // NO PIC --> ADD PIC
    if (previewSource && !formData.get('old-pic-cloudinary-public-id')){
      await fetch(`${BASE_URL}/api/upload-cloudinary`,{ method:'POST',
                                                        body:JSON.stringify({data:previewSource}),
                                                        headers:{'Content-type':'application/json'}                                                      
      }).then(async(res)=>await res.json())
        .then(async(json)=>{
          cloudinary_assigned_url = json.secure_url
          cloudinary_assigned_public_id = json.public_id
        })
        .catch(err=>console.log(err))
    }

    // OLD PIC --> NEW PIC
    if (previewSource && formData.get('old-pic-cloudinary-public-id')){
      await fetch(`${BASE_URL}/api/old-pic/${formData.get('old-pic-cloudinary-public-id')}`,{method:'DELETE'})
      await fetch(`${BASE_URL}/api/upload-cloudinary`,{ method:'POST',
                                                        body:JSON.stringify({data:previewSource}),
                                                        headers:{'Content-type':'application/json'}                                                      
      }).then(async(res)=>await res.json())
        .then(async(json)=>{
          cloudinary_assigned_url = json.secure_url
          cloudinary_assigned_public_id = json.public_id
        })
        .catch(err=>console.log(err))      
    }

    // OLD PIC --> NO PIC
    if (formData.get('no-photo') == 'on'){
      await fetch(`${BASE_URL}/api/old-pic/${formData.get('old-pic-cloudinary-public-id')}`,{method:'DELETE'}) 
      cloudinary_assigned_url = ''
      cloudinary_assigned_public_id = ''     
    }

    await fetch(`${BASE_URL}/api/dinner/${formData.get('id')}`,{method:'PUT',
                                                                headers:{'Content-Type':'application/json'},
                                                                body: JSON.stringify({
                                                                  section: formData.get('section'),
                                                                  name: formData.get('name'),
                                                                  allergies: formData.get('allergies'),
                                                                  preDescription: formData.get('preDescription'),
                                                                  description: formData.get('description'),
                                                                  price: formData.get('price'),
                                                                  cloudinary_url: cloudinary_assigned_url,
                                                                  cloudinary_public_id: cloudinary_assigned_public_id
                                                                })
    }).then(res=>{
              console.log(`Updated ${formData.get('name')}`);
              setEditForm(false)
              clearForm()
            })
      .then(async()=>await getDinnerItems())
      .then(closeForm())
      .catch(err=>console.log(err))
    document.querySelector('#admin-page-form-submit-button').textContent = 'Edit Item'
    document.querySelector('#admin-page-form-submit-button').disabled = false
    document.querySelector('#admin-page-form-submit-button').style.cursor = 'pointer'
    document.querySelector('#admin-page-form-submit-button').style.background = 'blue'
  }

  async function populateForm(id){
    openForm()
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
    document.querySelector('#admin-page-existing-cloudinary-url').value = target.cloudinary_url
    document.querySelector('#admin-page-existing-cloudinary-public-id').value = target.cloudinary_public_id
    target.cloudinary_url && setOldPic(true) 
    target.cloudinary_url && setOldPicID(target.cloudinary_public_id) 
    target.cloudinary_url && setOldPicURL(target.cloudinary_url) 
    document.querySelector('#admin-form').scrollIntoView({behavior:'smooth'})
  }

  function flipToggle(){
    if(!editMode){
      document.querySelector('#toggle-switch').style.transform = 'rotate(180deg)'
      document.querySelector('#admin-dinner-menu').style.height = 'auto'
      document.querySelector('#whitespace-controls').style.visibility = 'hidden'
      setEditMode(prev=>!prev)
      getDinnerItems()
    }else{
      document.querySelector('#whitespace-controls').style.visibility = 'visible'
      document.querySelector('#toggle-switch').style.transform = 'rotate(0deg)' 
      document.querySelector('#admin-dinner-menu').style.height = '14in'
      setEditMode(prev=>!prev)
      getDinnerItems()
    } 
  }
  
  function clearForm(){
    setEditForm(false)
    setOldPic(false)
    setOldPicURL('')
    setOldPicID('')
    setPreviewSource('')
    setIsChecked(false)
    document.querySelector('#image-binary').value = ''
    document.querySelector('#admin-page-id-input').value = ''
    document.querySelector('#admin-page-section-input').value = ''
    document.querySelector('#admin-page-name-input').value = ''
    document.querySelector('#admin-page-allergies-input').value = ''
    document.querySelector('#admin-page-pre-description-input').value = ''
    document.querySelector('#admin-page-main-description-input').value = ''
    document.querySelector('#admin-page-price-input').value = ''
    document.querySelector('#admin-page-existing-cloudinary-url').value = ''
    document.querySelector('#admin-page-existing-cloudinary-public-id').value = ''
    document.querySelector('#main-photo').style.visibility = 'visible'
  }

  function openForm(){    
    document.querySelector('#admin-form-outer-wrapper').style.display = 'grid'
    document.querySelector('#admin-page-not-form').style.display = 'none'
  }

  function closeForm(){    
    document.querySelector('#admin-page-not-form').style.display = 'block'
    document.querySelector('#admin-form-outer-wrapper').style.display = 'none'
  }

  return (
    <>

      <div id='admin-page-wrapper-dinner-menu'>
        <div id='admin-page-not-form'>
          <div id='admin-page-footer-flexbox-top'>
          <div id='admin-header' className='no-print'>
            <div id='admin-header-content'>
              <span id='admin-page'>Admin Page</span>

              <span id='admin-page-toggle-menu'>
                Print Preview 
                <FaToggleOff  id='toggle-switch' 
                              onClick={flipToggle} 
                              size={30} 
                              style={{cursor:'pointer'}} /> 
                Edit Mode
              </span>
              
                <button onClick={()=> editMode ? openForm() : window.print()} 
                        id='admin-page-print-button'>
                          {editMode ? '+ Item' : 'Print'} 
                </button>
            </div>{/* #admin-header-content */}

            <div id='whitespace-controls'>
            
              <span id='whitespace-vertical'>
                <FaCaretSquareUp  onClick={increaseVerticalWhitespace} 
                                  style={{transform:'rotate(0deg)',cursor:'pointer'}} />
                <span>{whitespaceVertical}</span>
                <FaCaretSquareUp  onClick={decreaseVerticalWhitespace} 
                                  style={{transform:'rotate(180deg)',cursor:'pointer'}} />
              </span>{/* #whitespace-vertical */}
            
              <span>WHITESPACE</span> 
            
              <span id='whitespace-horizontal'>
                <FaCaretSquareUp  onClick={decreaseHorizontalWhitespace} 
                                  style={{transform:'rotate(270deg)',cursor:'pointer'}} />
                <span>&nbsp;{whitespaceHorizontal}&nbsp;</span>
                <FaCaretSquareUp  onClick={increaseHorizontalWhitespace} 
                                  style={{transform:'rotate(90deg)',cursor:'pointer'}} />
              </span>{/* #whitespace-horizontal */}
            
            </div>{/* #whitespace-control */}
          </div>{/* #admin-header */}





















        <div className='no-print' style={{height:'120px',width:'100%'}}></div>        
          <div id='admin-dinner-menu'>
            <h1><span style={{paddingLeft:whitespaceHorizontal}} className='logo'>olea</span></h1>
            <hr style={{marginBottom:'20px'}} />

            <div id='admin-dinner-menu-top'>
              <div id='admin-dinner-menu-top-left'>

                <div id='admin-dinner-menu-meats'>
                  {dinnerItems.filter(item=>item.section == 'Meats' && item.sequence).map(data=>{
                    return <AdminDinnerMenuItem data={data} 
                                                sectionLength={dinnerItems.filter(item=>item.section == 'Meats' && item.sequence).length}
                                                getDinnerItems={()=>getDinnerItems()}
                                                onDeleteClick={()=>deleteDinnerMenuItem(data._id,data.name)} 
                                                onEditClick={()=>populateForm(data._id)}
                                                marginVertical={whitespaceVertical}
                                                paddingHorizontal={whitespaceHorizontal}
                                                key={data._id} 
                                                editMode = {editMode} />                  
                  })}
                </div>{/* #admin-dinner-menu-meats */}

                <div id='admin-dinner-menu-appetizers'>
                  {dinnerItems.filter(item=>item.section == 'Appetizers' && item.sequence).map(data=>{
                    return <AdminDinnerMenuItem data={data} 
                                                sectionLength={dinnerItems.filter(item=>item.section == 'Appetizers' && item.sequence).length} 
                                                getDinnerItems={()=>getDinnerItems()}
                                                onDeleteClick={()=>deleteDinnerMenuItem(data._id,data.name)} 
                                                onEditClick={()=>populateForm(data._id)}
                                                marginVertical={whitespaceVertical}
                                                paddingHorizontal={whitespaceHorizontal}
                                                key={data._id}
                                                editMode = {editMode} />
                  })}
                  
                </div>{/* #admin-dinner-menu-appetizers */}
              </div>{/* #admin-dinner-menu-top-left */}

              <div id='admin-dinner-menu-top-right'>
                {dinnerItems.filter(item=>item.section == 'Entrées' && item.sequence).map(data=>{
                    return <AdminDinnerMenuItem data={data} 
                                                sectionLength={dinnerItems.filter(item=>item.section == 'Entrées' && item.sequence).length}
                                                getDinnerItems={()=>getDinnerItems()}
                                                onDeleteClick={()=>deleteDinnerMenuItem(data._id,data.name)} 
                                                onEditClick={()=>populateForm(data._id)}
                                                marginVertical={whitespaceVertical}
                                                paddingHorizontal={whitespaceHorizontal}
                                                key={data._id}
                                                editMode = {editMode} />
                  })}

              <div id='tasting-menu' style={{ border:'1px solid black',
                                              paddingTop:whitespaceVertical,
                                              paddingBottom:whitespaceVertical,
                                              paddingLeft:whitespaceHorizontal,
                                              paddingRight:whitespaceHorizontal
                                            }}>
                  <span style={{fontFamily:'FuturaLight',fontWeight:'900'}}>
                    chef's tasting menu</span> <span style={{fontStyle:'italic'}}>six courses <span style={{fontWeight:'900'}}>105</span> / person</span><br/>
                  <span style={{fontStyle:'italic',fontWeight:'900'}}>48-hours notice and reservation required</span><br/>
                  full table participation<br/>
                  available tuesday through thursday<br/>
                  <span style={{fontStyle:'italic'}}>optional wine pairing available <span style={{fontWeight:'900'}}>52</span> / person</span><br/>
              </div>{/* #tasting-menu */}
              </div>{/* #admin-dinner-menu-top-right */}

            </div>{/* #admin-dinner-menu-top */}










            <h2 style={{paddingLeft:whitespaceHorizontal,fontSize:'25px',fontWeight:'900'}}>sides</h2>
            <div id='admin-dinner-menu-sides'>
                {dinnerItems.filter(item=>item.section == 'Sides' && item.sequence).map(data=>{
                    return <AdminDinnerMenuItem data={data} 
                                                sectionLength={dinnerItems.filter(item=>item.section == 'Sides' && item.sequence).length}
                                                getDinnerItems={()=>getDinnerItems()}
                                                onDeleteClick={()=>deleteDinnerMenuItem(data._id,data.name)} 
                                                onEditClick={()=>populateForm(data._id)}
                                                marginVertical={whitespaceVertical}
                                                paddingHorizontal={whitespaceHorizontal}
                                                key={data._id}
                                                editMode = {editMode} /> 
                })}
            </div>{/* #admin-dinner-menu-sides */}
                

            <div style={{paddingLeft:whitespaceHorizontal,paddingRight:whitespaceHorizontal}} id='admin-dinner-menu-footer'>
                <div id='chef'>manuel romero, chef</div>
                <div id='qr'><img width='65px' src='./qrCode.jpg'/></div>
                <div id='legal'>
                  consumer advisory: consumption of undercooked meat, poultry, eggs, or seafood may increase the risk of food-borne illnesses<br/>
                  all menu items are subject to change according to seasonality and availability<br/>
                  <div>
                    please alert your server if you have special dietary requirements before ordering:<br/> 
                    gl (gluten), d (dairy), n (nuts)
                  </div>
                </div>{/* #legal */}
            </div>{/* #admin-dinner-menu */}          
          </div>{/* #admin-dinner-menu */}




















          {editMode && (archiveLength > 0) && 
            <>
              <div id='archive-wrapper'>
                <div id='archive-content'>
                  <div style={{textAlign:'center'}}><h2>Archived Items</h2></div>
                  {dinnerItems.filter(item=>item.sequence == 0).map(data=>{
                    return <ArchiveDinnerMenuItem data={data} 
                                                  getDinnerItems={()=>getDinnerItems()}
                                                  deleteArchivedMenuItem={()=>deleteArchivedMenuItem(data._id)} 
                                                  editMode = {editMode}
                                                  key={data._id} /> 
                })}
                </div>{/* #archive-content */}
              </div>{/* #archive-wrapper */}
            </>
          }
          
          </div>{/* #admin-page-footer-flexbox-top */}
          <div  id='admin-page-footer-wrapper'
                style={{minWidth:'8.5in'}}>
                  <PageFooter className='no-print' color='blue' />
          </div>

        </div>{/* #admin-page-not-form */}
















      {/* FORM */}

        <div id='admin-form-outer-wrapper' style={{display:'none'}}>
          <div id='admin-form-inner-wrapper'>
            <form action={editForm ? editDinnerItem : addDinnerItem} 
                  id='admin-form'>
              <h2>{editForm ? 'Edit' : 'Create New'} Item</h2><br/>

              <input type='hidden' name='id' id='admin-page-id-input' />
              <input  type='hidden' 
                      name='admin-page-existing-cloudinary-url' 
                      id='admin-page-existing-cloudinary-url'
                      value='' />
              <input  type='hidden' 
                      name='admin-page-existing-cloudinary-public-id' 
                      id='admin-page-existing-cloudinary-public-id'
                      value='' />
              <label>
                Section:&nbsp;&nbsp; 
                <select id='admin-page-section-input' 
                        required
                        name='section' 
                        defaultValue=''>
                  <option value='' disabled>Section...</option>
                  <option>Meats</option>
                  <option>Appetizers</option>
                  <option>Entrées</option>
                  <option>Sides</option>
                </select><br/><br/>
              </label>

              <label>
                Name:<br/>
                <input  id='admin-page-name-input' 
                        required
                        type='text'
                        maxLength={500} 
                        name='name' /><br/><br/>
              </label>

              <label>
                Allergies:<br/>
                <input  id='admin-page-allergies-input' 
                        maxLength={500}
                        type='text' 
                        name='allergies' /><br/><br/>
              </label>

              <label>
                Mini-Description:<br/>
                <input  id='admin-page-pre-description-input' 
                        maxLength={500}
                        type='text' 
                        name='preDescription' /><br/><br/>
              </label>

              <label>
                Main Description:<br/>
                <textarea id='admin-page-main-description-input' 
                          maxLength={500}
                          name='description' 
                          rows='5'></textarea><br/><br/>
              </label>

              <label>
                Price:<br/>
                <input  id='admin-page-price-input' 
                        required
                        type='text' 
                        maxLength={500}
                        name='price' 
                        autoComplete='off' /><br/><br/>
              </label>

                { oldPic && <>
                              Current Photo:<br/>
                                <input  type='hidden'
                                        id='old-pic-ID' 
                                        name='old-pic-cloudinary-public-id' 
                                        value={oldPicID} />

                              <div style={{position:'relative'}}>
                                <div style={{ position:'absolute',
                                              width:'100%',
                                              height:'100%',
                                              display:'grid',
                                              placeContent:'center'}}>
                                  <MdDoNotDisturb size='100px'
                                                  id='do-not' 
                                                  style={{color:'transparent'}} />
                                </div>
                                <div id='old-pic-wrapper'>
                                  <img  style={{maxHeight:'175px',maxWidth:'175px'}} 
                                        src={oldPicURL} />
                                </div>{/* #old-pic-wrapper */}
                              </div>

                              <br/><br/>

                              <br/>Display NO Photo: (optional) <input  name='no-photo' 
                                                                        checked={isChecked}
                                                                        onChange={toggleCheckbox}
                                                                        type='checkbox'/><br/><br/>
                            </>
                  
                }

              <div id='main-photo'>
                <label>
                  { oldPic && 'Change ' }
                  Photo: (optional)<br/>
                  <input  type='file' 
                          onChange={handleFileInputChange}
                          id='image-binary'
                          name='imageBinary' /><br/><br/>
                </label>
                {previewSource && <>
                                    <div style={{width:'100%',textAlign:'center'}}>
                                      <img  src={previewSource}
                                          alt='Image File Upload Preview'
                                          id='preview-upload'
                                          style={{maxHeight:'175px',
                                                  maxWidth:'175px'}} />
                                    </div>
                                  </>}
              </div>{/* #main-photo */}
              <button type='submit' 
                      id='admin-page-form-submit-button'
                      style={{color:'white',background: editForm ? 'blue' : 'green'}}
                      className='admin-form-btn'>{editForm ? 'Edit Item' : 'Add Item'}</button>

              <div  onClick={()=>clearForm()} 
                    style={{background:'darkgrey'}}
                    className='admin-form-btn'>Clear Form</div>

            </form>{/* #admin-form */}
          </div>{/* #admin-form-inner-wrapper */}
        </div>{/* #admin-form-outer-wrapper */}
     
{/* END FORM */}   









      </div>{/* #admin-page-wrapper-dinner-menu */}
    </>
  )
}
