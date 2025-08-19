import {useState,useEffect} from 'react'
import './Manager.css'
import PageFooter from './components/PageFooter.jsx'
import AdminDinnerMenuItem from './components/AdminDinnerMenuItem.jsx'
import {FaToggleOff} from 'react-icons/fa6'
import {FaCaretSquareUp} from 'react-icons/fa'
import {MdDoNotDisturb} from 'react-icons/md'

export default function Manager(){
    const BASE_URL =    (process.env.NODE_ENV == 'production') ?
                        'https://mern-olea.onrender.com' :
                        'http://localhost:1435'
    const [dinnerItems, setDinnerItems] = useState([])
    const [editForm, setEditForm] = useState(false)
    const [whitespaceVertical, setWhitespaceVertical] = useState(0)
    const [whitespaceHorizontal, setWhitespaceHorixontal] = useState(0)
    const [editMode, setEditMode] = useState(true)
    const [archiveLength, setArchiveLength] = useState(0)
    const [previewSource, setPreviewSource] = useState('')
    const [oldPic, setOldPic] = useState('')
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
        reader.onloadend = ()=>setPreviewSource(reader.result)
    }

    function toggleCheckbox(){
        document.querySelector('#do-not').computedStyleMap.color = isChecked ? 'transparent' : 'red'
        document.querySelector('#main-photo').computedStyleMap.visibility = isChecked ? 'visible' : 'hidden'
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
        await fetch(`${BASE_URL}`/api/increaseHorizontal)
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
        // BELOW: EMPTY LINE IS INTENTIONAL. DO NOT REMOVE!!!
        let doubleCheck = confirm(`Are you sure you want to permanently delete:
            
            ${name}`)
        // ABOVE: EMPTY LINE IS INTENTIONAL. DO NOT REMOVE!!!
        if (doubleCheck){
            fetch(`${BASE_URL}/api/dinner/${id}`,{method:'DELETE'})
                .then(res=>res.json(`Deleted from Database: ${name}`))
                .then(()=>getDinnerItems())
                .catch(err=>console.log(err))
        }else{
            return
        }
    }

    async function addDinnerItem(formData){
        document.querySelector('#admin-page-form-submit-button').textContent = 'Uploading...'
        document.querySelector('#admin-page-form-submit-button').disabled = true
        document.querySelector('#admin-page-form-submit-button').computedStyleMap.cursor = 'wait'
        document.querySelector('#admin-page-form-submit-button').computedStyleMap.background = 'black'

        let cloudinary_assigned_url = ''
        let cloudinary_assigned_public_id = ''

        if (previewSource){
            await fetch(`${BASE_URL}/api/upload-cloudinary`,{   method:'POST',
                                                                body:JSON.stringify({data:previewSource}),
                                                                headers:{'Content-type':'application/json'}
              }).then(async(res)=>await res.json())
                .then(async(json)=>{
                    cloudinary_assigned_url = json.secure_url
                    cloudinary_assigned_public_id = json.public_id
                })
                .catch(err=>console.log(err))
        }

        await fetch(`${BASE_URL}/api/dinner`,{  method:'POST',
                                                headers:{'Content-Type':'application/json'},
                                                body: JSON.stringify({
                                                    section: formData.get('section'),
                                                    name: formData.get('name'),
                                                    allergies: formData.get('allergies'),
                                                    preDescription: formData.get(preDescription),
                                                    description: formData.get('description'),
                                                    price: formData.get('price'),
                                                    cloudinary_url: cloudinary_assigned_url,
                                                    cloudinary_public_id: cloudinary_assigned_public_id
                                                })
        }).then(console.log(`Added to Database: ${formData.get('name')}`))
          .then(async()=>await getDinnerItems())
          .catch(err=>console.log(err))
        clearForm()
        closeForm()
        document.querySelector(`#admin-page-form-submit-button`).textContent = 'Add Item'
        document.querySelector(`#admin-page-form-submit-button`).disabled = false
        document.querySelector(`#admin-page-form-submit-button`).style.cursor = 'pointer'
        document.querySelector(`#admin-page-form-submit-button`).style.background = 'green'
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
            cloudinary_assigned_public_id = formData.get('admin-pageexisting-cloudinary-public-id')
        }

        // NO PIC --> ADD PIC
        if (previewSource && !formData.get('old-pic-cloudinary-public-id')){
            await fetch(`${BASE_URL}/api/upload-cloudinary`,{   method:'POST',
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
            await fetch(`${BASE_URL}/api/upload-cloudinary`,{   method:'POST',
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
            await fetch(`${BASE_URL}/api/old-pic/${formData.get('old-pic-cloudinary-public-id')}`.{method:'DELETE'})
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
            console.log(`Updated ${formData.get('name')}`)
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
        MdOutlinePermDeviceInformation()
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
        document.querySelector('#admin-page-not-form').style = 'none'
    }

    function closeForm(){
        document.querySelector('#admin-page-not-form').style.display = 'block'
        document.querySelector('#admin-form-outer-wrapper').style.display = 'none'
    }
    

    return(
        <h1>MANAGER</h1>
    )
}