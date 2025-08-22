import './ManagerPageForm.css'
import {useState} from 'react'
import { AiTwotoneCloseCircle } from "react-icons/ai";

export default function ManagerPageForm(){

    const BASE_URL =    (process.env.NODE_ENV == 'production') ?
                        'https://mern-olea.onrender.com' : 
                        'http://localhost:1435'

    const [editForm, setEditForm] = useState(false)
    const [previewImage, setPreviewImage] = useState('')

    function handleFileInputChange(e){
        const file= e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file) // converts binary image file to a string
        reader.onloadend = ()=> setPreviewImage(reader.result)
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
        }).then(alert(`Added: ${formData.get('name')}`))
          .then(async()=>getDinnerItems())
          .catch(err=>console.log(err))

        clearForm()
        document.querySelector('#manager-page-form-submit-button').style.color = 'black'
        document.querySelector('#manager-page-form-submit-button').textContent = 'Add Item'
        document.querySelector('#manager-page-form-submit-button').disabled = false
        document.querySelector('#manager-page-form-submit-button').style.cursor = 'pointer'
        document.querySelector('#manager-page-form-submit-button').style.background = 'lightgreen'

    }

    function editDinnerItem(id){

    }

    function clearForm(){
        document.querySelector('#manager-page-section-input').value = ''
        document.querySelector('#manager-page-name-input').value = ''
        document.querySelector('#manager-page-allergies-input').value = ''
        document.querySelector('#manager-page-description-input').value = ''
        document.querySelector('#manager-page-price-input').value = ''
        document.querySelector('#manager-page-file-input').value = ''
        if(document.querySelector('#manager-page-preview-upload')){
            document.querySelector('#manager-page-preview-upload').value = ''
        }
        setPreviewImage('')
    }

    function exitForm(){
        clearForm()
        document.querySelector('#manager-page-wrapper main').style.display = 'block'
        document.querySelector('#manager-page-form').style.display = 'none'
    }
    return(
        <>
        <div id='manager-page-form-wrapper'>

        
            <form action={editForm ? editDinnerItem : addDinnerItem}>
                <AiTwotoneCloseCircle   size={30} 
                                        onClick={exitForm}
                                        style={{position:'absolute',
                                                cursor:'pointer',
                                                right:'10px',
                                                top:'10px'}} />
                <br/><br/>
                <h2>{editForm ? 'Edit' : 'Create New'} Item</h2><br/>

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

                <label>
                    Photo: (optional)<br/>
                    <input  type='file' 
                            onChange={handleFileInputChange}
                            name='image-binary'
                            id='manager-page-file-input' /><br/><br/>
                </label>
                {previewImage &&    <>
                                        <div style={{width:'100%',textAlign:'center'}}>
                                            <img    src={previewImage}
                                                    id='manager-page-preview-upload'
                                                    alt='Image File Upload Preview'
                                                    style={{maxHeight:'175px',maxWidth:'175px'}} />
                                        </div>
                                    </>}

                <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
                    
                    <button id='manager-page-form-submit-button' 
                            style={{background:'lightgreen'}}>Add Item</button>
                    
                    <div    onClick={clearForm} 
                            className='btn'>Clear Form</div>
                </div>

            </form>
        </div>
        </>
    )
}