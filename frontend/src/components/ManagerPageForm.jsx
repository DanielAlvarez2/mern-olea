import './ManagerPageForm.css'
import {useState} from 'react'
import { AiTwotoneCloseCircle } from "react-icons/ai"
import { MdDoNotDisturbAlt } from "react-icons/md";

export default function ManagerPageForm(props){

    const BASE_URL =    (process.env.NODE_ENV == 'production') ?
                        'https://mern-olea.onrender.com' : 
                        'http://localhost:1435'

    const [previewImage, setPreviewImage] = useState('')
    // const [oldPicID, setOldPicID] = useState('')
    const [isChecked, setIsChecked] = useState(false)


    function handleFileInputChange(e){
        const file= e.target.files[0]
        if (file.size/1000000 > 5){
            alert(`File size is too large.`)
            document.querySelector('#manager-page-file-input').value = ''
        }else{
            const reader = new FileReader()
            reader.readAsDataURL(file) // converts binary image file to a string
            reader.onloadend = ()=> setPreviewImage(reader.result)
        }
    }

    async function addDinnerItem(formData){
        document.querySelector('#manager-page-form-submit-button').style.color = 'white'
        document.querySelector('#manager-page-form-submit-button').textContent = 'Uploading...'
        document.querySelector('#manager-page-form-submit-button').disabled = true
        document.querySelector('#manager-page-form-submit-button').style.cursor = 'wait'
        document.querySelector('#manager-page-form-submit-button').style.background = 'black'

        let cloudinary_assigned_url = ''
        let cloudinary_assigned_public_id = ''

        if (previewImage){
            await fetch(`${BASE_URL}/api/upload-cloudinary`,{   method:'POST',
                                                                body: JSON.stringify({data:previewImage}),
                                                                headers: {'Content-type':'application/json'}
            }).then(async(res)=>await res.json())
              .then(async(json)=>{
                cloudinary_assigned_url = json.secure_url
                cloudinary_assigned_public_id = json.public_id
              })
              .catch(err=>console.log(err))
        }

        await fetch(`${BASE_URL}/api/dinner`,{  method:'POST',
                                                headers: {'Content-Type':'application/json'},
                                                body: JSON.stringify({
                                                    section: formData.get('section'),
                                                    name: formData.get('name'),
                                                    allergies: formData.get('allergies'),
                                                    preDescription: formData.get('pre-description'),
                                                    description: formData.get('description'),
                                                    price: formData.get('price'),
                                                    cloudinary_url: cloudinary_assigned_url,
                                                    cloudinary_public_id: cloudinary_assigned_public_id
                                                })
        }).then(async()=>alert(`Added: ${formData.get('name')}`))
          .then(async()=>props.getDinnerItems())
          .catch(err=>console.log(err))

        clearForm() 
        // React19 automatically clears forms when submitted, but previewImage still needs to be reset
    }

    async function editDinnerItem(formData){
        document.querySelector('#manager-page-form-submit-button').style.color = 'white'
        document.querySelector('#manager-page-form-submit-button').textContent = 'Uploading...'
        document.querySelector('#manager-page-form-submit-button').disabled = true
        document.querySelector('#manager-page-form-submit-button').style.cursor = 'wait'
        document.querySelector('#manager-page-form-submit-button').style.background = 'black'


        let cloudinary_assigned_url = ''
        let cloudinary_assigned_public_id = ''

        // NO PIC --> NO PIC              
     
        // NO PIC --> ADD PIC
        if(previewImage && !props.oldPicID){
            await fetch(`${BASE_URL}/api/upload-cloudinary`,{   method:'POST',
                                                                body: JSON.stringify({data:previewImage}),
                                                                headers: {'Content-type':'application/json'}
            }).then(async(res)=>await res.json())
              .then(async(json)=>{
                cloudinary_assigned_url = json.secure_url
                cloudinary_assigned_public_id = json.public_id
              })
              .catch(err=>console.log(err))
        }

        // OLD PIC --> NEW PIC
        if(previewImage && props.oldPicID){
            await fetch(`${BASE_URL}/api/old-pic/${props.oldPicID}`,{method:'DELETE'})

            await fetch(`${BASE_URL}/api/upload-cloudinary`,{   method:'POST',
                                                                body: JSON.stringify({data:previewImage}),
                                                                headers: {'Content-type':'application/json'}
            }).then(async(res)=>await res.json())
              .then(async(json)=>{
                cloudinary_assigned_url = json.secure_url
                cloudinary_assigned_public_id = json.public_id
              })
              .catch(err=>console.log(err))
        }

        // OLD PIC --> NO PIC
        if(formData.get('no-photo') == 'on'){
            await fetch(`${BASE_URL}/api/old-pic/${props.oldPicID}`,{method:'DELETE'})
            cloudinary_assigned_url = ''
            cloudinary_assigned_public_id = ''
        }


        
        await fetch(`${BASE_URL}/api/dinner/${formData.get('manager-page-id')}`,{method:'PUT',
                                                                    headers:{'Content-type':'application/json'},
                                                                    body: JSON.stringify({
                                                                        section: formData.get('section'),
                                                                        name: formData.get('name'),
                                                                        allergies: formData.get('allergies'),
                                                                        preDescription: formData.get('pre-description'),
                                                                        description: formData.get('description'),
                                                                        price: formData.get('price'),
                                                                        cloudinary_url: cloudinary_assigned_url,
                                                                        cloudinary_public_id: cloudinary_assigned_public_id
                                                                    })
        }).then(async()=>await props.getDinnerItems())
          .then(alert(`Updated: ${formData.get('name')}`))
          .catch(err=>console.log(err))
        
        clearForm()
    }    

    

    function clearForm(){
        document.querySelector('#manager-page-section-input').value = ''
        document.querySelector('#manager-page-name-input').value = ''
        document.querySelector('#manager-page-allergies-input').value = ''
        document.querySelector('#manager-page-mini-description-input').value = ''
        document.querySelector('#manager-page-description-input').value = ''
        document.querySelector('#manager-page-price-input').value = ''
        document.querySelector('#manager-page-file-input').value = ''
        if(document.querySelector('#manager-page-preview-upload')){
            document.querySelector('#manager-page-preview-upload').value = ''
        }
        setPreviewImage('')
        document.querySelector('#manager-page-form-submit-button').style.color = 'black'
        document.querySelector('#manager-page-form-submit-button').textContent = 'Add Item'
        document.querySelector('#manager-page-form-submit-button').disabled = false
        document.querySelector('#manager-page-form-submit-button').style.cursor = 'pointer'
        document.querySelector('#manager-page-form-submit-button').style.background = 'lightgreen'
        props.setOldPic(false)
        setIsChecked(false)
        props.setEditForm(false)
        if(document.querySelector('#do-not')) document.querySelector('#do-not').style.color = 'transparent'
        document.querySelector('#main-photo').style.visibility = 'visible'

    }

    function toggleCheckbox(){
        document.querySelector('#do-not').style.color = isChecked ? 'transparent' : 'red'
        document.querySelector('#main-photo').style.visibility = isChecked ? 'visible' : 'hidden'
        document.querySelector('#manager-page-file-input').value = ''
        setPreviewImage(null)
        setIsChecked(prev=>!prev)
    }

    function exitForm(){
        clearForm()
        document.querySelector('#manager-page-wrapper main').style.display = 'block'
        document.querySelector('#manager-page-form').style.display = 'none'
    }
    return(
        <>
        <div id='manager-page-form-wrapper'>

        
            <form action={props.editForm ? editDinnerItem : addDinnerItem}>
                <AiTwotoneCloseCircle   size={30} 
                                        onClick={exitForm}
                                        style={{position:'absolute',
                                                cursor:'pointer',
                                                right:'10px',
                                                top:'10px'}} />
                <br/><br/>
                <h2>{props.editForm ? 'Edit' : 'Create New'} Item</h2><br/>

                <input  type='hidden' 
                        name='manager-page-id' 
                        id='manager-page-id-input' 
                />
                <input  type='hidden' 
                        name='manager-page-existing-cloudinary-url' 
                        id='manager-page-existing-cloudinary-url'
                />
                <input  type='hidden' 
                        name='manager-page-existing-cloudinary-public-id' 
                        id='manager-page-existing-cloudinary-public-id'
                />

                <label>
                    Section:&nbsp; 
                    <select required
                            name='section'
                            id='manager-page-section-input' 
                            defaultValue={''}>
                        <option disabled value=''>Select...</option>
                        <option>Meats</option>
                        <option>Appetizers</option>
                        <option>Entrées</option>
                        <option>Sides</option>
                    </select> <span className='required'>*required</span><br/><br/>
                </label>

                <label>
                    Name: <span className='required'>*required</span><br/>
                    <input  type='text'
                            name='name'
                            id='manager-page-name-input' 
                            maxLength={500}
                            required /><br/><br/>
                </label>

                <label>
                    Allergies:<br/>
                    <input  type='text'
                            name='allergies'
                            maxLength={500}
                            id='manager-page-allergies-input' /><br/><br/>
                </label>

                <label>
                    Mini-Description:<br/>
                    <input  type='text'
                            id='manager-page-mini-description-input'
                            maxLength={500}
                            name='pre-description' /><br/><br/>
                </label>

                <label>
                    Main Description:<br/>
                    <textarea   name='description'
                                rows='5'
                                id='manager-page-description-input'
                                maxLength={500}></textarea><br/><br/>
                </label>

                <label>
                    Price: <span className='required'>*required</span><br/>
                    <input  type='text'
                            name='price'
                            autoComplete='off'
                            id='manager-page-price-input'
                            maxLength={500} 
                            required /><br/><br/>
                </label>

                {props.oldPic &&    <>
                                        <input  type='hidden'
                                        id='old-pic-ID' 
                                        name='old-pic-cloudinary-public-id' 
                                        value={props.oldPicID} />

                                        <input  type='hidden'
                                        id='old-pic-URL' 
                                        name='old-pic-cloudinary-url' 
                                        value={props.oldPicURL} />

                                        Current Photo:
                                        <div style={{position:'relative'}}>
                                            <div style={{   position:'absolute',
                                                            width:'100%',
                                                            height:'100%',
                                                            display:'grid',
                                                            placeContent:'center'
                                            }}>
                                                <MdDoNotDisturbAlt  size={100} 
                                                                    id='do-not'
                                                                    style={{color:'transparent'}}
                                                />
                                            </div>
                                            <div style={{width:'100%',textAlign:'center'}}>
                                                <img    style={{maxHeight:'175px',maxWidth:'175px'}} 
                                                        src={props.oldPicURL ? props.oldPicURL : null} />
                                            </div>
                                        </div>

                                        <br/>
                                        <label>
                                            <input  style={{display:'inline-block',width:'20px'}} 
                                                    checked={isChecked}
                                                    name='no-photo'
                                                    onChange={toggleCheckbox}
                                                    type='checkbox' />
                                            Display NO Photo (optional)
                                        </label>
                                        <br/>
                                         
                                    </>}

                <br/>
                <div id='main-photo'>
                    <label>
                        {props.oldPic && 'Change'} Photo: (optional)<br/>
                        <input  type='file' 
                                onChange={handleFileInputChange}
                                name='image-binary'
                                id='manager-page-file-input' /><br/><br/>
                    </label>
                </div>
                {previewImage &&    <>
                                        <div style={{width:'100%',textAlign:'center'}}>
                                            <img    src={previewImage ? previewImage : null}
                                                    id='manager-page-preview-upload'
                                                    alt='Image File Upload Preview'
                                                    style={{maxHeight:'175px',maxWidth:'175px'}} />
                                        </div>
                                    </>}

                <br/>
                <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
                    
                    <button id='manager-page-form-submit-button' 
                            style={{background: props.editForm ? 'lightblue' : 'lightgreen'}}>
                                {props.editForm ? 'Update Item' : 'Add Item'}
                    </button>
                    
                    <div    onClick={clearForm} 
                            className='btn'>Clear Form</div>
                </div>

            </form>
        </div>
        </>
    )
}