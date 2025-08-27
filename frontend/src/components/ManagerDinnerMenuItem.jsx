import './ManagerDinnerMenuItem.css'
import { FaCamera } from "react-icons/fa"
import { AiTwotoneCloseCircle } from "react-icons/ai"
import { BiSolidUpArrow } from "react-icons/bi"

export default function ManagerDinnerMenuItem(props){
    const BASE_URL =    (process.env.NODE_ENV == 'production') ?
                        'https://mern-olea.onrender.com' : 
                        'http://localhost:1435'

    function deleteDinnerMenuItem(id,name){
        // BELOW: empty line is intentional. Do not remove!!!
        let doubleCheck = confirm(`Are you sure you want to permanently delete:
        
        ${name}`)
        // ABOVE: empty line is intentional. Do not remove!!!
        if (doubleCheck){
            fetch(`${BASE_URL}/api/dinner/${id}`,{method:'DELETE'})
                .then(res=>res.json(`Item Deleted from Database`))
                .then(()=>props.getDinnerItems())
                .catch(err=>console.log(err))      
        }else{return}
    }

    function archiveDinnerMenuItem(id,name){
        // BELOW: empty line is intentional. Do not remove!!!
        let doubleCheck = confirm(`Are you sure you want to archive:
        
        ${name}`)
        // ABOVE: empty line is intentional. Do not remove!!!
        if (doubleCheck){
            fetch(`${BASE_URL}/api/archive/${id}`,{method:'PUT'})
                .then(res=>res.json(`Item Archived: ${name}`))
                .then(()=>props.getDinnerItems())
                .catch(err=>console.log(err))      
        }else{return}
    }

    function UNarchiveDinnerMenuItem(id,name){
        fetch(`${BASE_URL}/api/unarchive/${id}`,{method:'PUT'})
            .then(res=>res.json(`Item Archived: ${name}`))
            .then(()=>props.getDinnerItems())
            .catch(err=>console.log(err))      
    }

    function showPhoto(id){
        document.querySelector(`#photo-${id}`).style.display = 'grid'
    }

    function closeModal(id){
        document.querySelector(`#photo-${id}`).style.display = 'none'
    }

    async function moveUp(id){
      await fetch(`${BASE_URL}/api/moveUp/${id}`)
              .then(()=>props.getDinnerItems())
              .catch(err=>console.log(err))
    }

    async function moveDown(id){
      await fetch(`${BASE_URL}/api/moveDown/${id}`)
              .then(()=>props.getDinnerItems())
              .catch(err=>console.log(err))
    }

    function editButtonClick(   id,
                                cloudinary_url,
                                cloudinary_public_id,
                                section,
                                name,
                                allergies,
                                preDescription,
                                description,
                                price
    ){
        props.setEditForm(true)
        props.showForm()
        document.querySelector('#manager-page-id-input').value = id
        document.querySelector('#manager-page-existing-cloudinary-url').value = cloudinary_url
        cloudinary_url && setOldPic(true)
        document.querySelector('#manager-page-existing-cloudinary-public-id').value = cloudinary_public_id
        document.querySelector('#manager-page-section-input').value = section
        document.querySelector('#manager-page-name-input').value = name
        document.querySelector('#manager-page-allergies-input').value = allergies
        document.querySelector('#manager-page-mini-description-input').value = preDescription
        document.querySelector('#manager-page-description-input').value = description
        document.querySelector('#manager-page-description-input').value = description
        document.querySelector('#manager-page-price-input').value = price
    }

    return(
        <div><br/>
            {props.data.section == 'Sides' && 
                <div style={{display:'flex',justifyContent:'space-between'}}>
                     {props.data.sequence != '1' ? 
                        <BiSolidUpArrow size={30} 
                                        onClick={()=>moveUp(props.data._id)}
                                        style={{color:'green',
                                                transform:'rotate(-90deg)',
                                                cursor:'pointer'}} />
                     : 
                        <span></span>
                     }
                    
                                    
                    {props.data.sequence != props.sectionLength ? 
                    <BiSolidUpArrow size={30} 
                                    onClick={()=>moveDown(props.data._id)}
                                    style={{color:'green',
                                            transform:'rotate(90deg)',
                                            cursor:'pointer'}} />
                    
                    :
                        <span></span>
                    }
                    
                </div>
            }
            {props.data.sequence != '1' && props.data.section != 'Sides' &&  
                <div style={{textAlign:'center'}}>
                    <BiSolidUpArrow size={30} 
                                    onClick={()=>moveUp(props.data._id)}
                                    style={{color:'green',
                                            cursor:'pointer'}} />
                </div>
            }
            
            {props.data.cloudinary_url && <FaCamera style={{cursor:'pointer'}}
                                                    size={20}
                                                    onClick={()=>showPhoto(props.data._id)} />}
            <div className='photo-modal' id={`photo-${props.data._id}`}>
                <AiTwotoneCloseCircle   size={40}
                                        onClick={()=>closeModal(props.data._id)} 
                                        style={{position:'absolute',
                                                top:'0',
                                                right:'0',
                                                cursor:'pointer'}} />
                <div>
                    <figure>
                        <img className='modal-pic' src={props.data.cloudinary_url} />
                        <figcaption>
                            <span className='name'>{props.data.name}</span>
                            <span className='allergies'> ({props.data.allergies})</span><br/>
                            <span className='pre-description'>{props.data.preDescription}; </span>
                            <span className='description'>{props.data.description}</span>
                            <span className='price'>&nbsp;&nbsp;{props.data.price}</span>
                        </figcaption>
                    </figure>

                </div>
            </div>{/* .photo-modal */}
            
            {props.data.name == 'jamón ibérico' ?  
                <div style={{display:'flex',alignItems:'center',gap:'5px',flexWrap:'wrap'}}>
                    <span className='name'>{props.data.name}</span>
                    <span className='price'>{props.data.price}</span>
                </div>
            :   <>
                    <div style={{display:'flex',flexWrap:'wrap',alignItems:'center'}}>
                        <span className='name'>{props.data.name}&nbsp;</span>
                        
                        {props.data.allergies &&    <>
                                                        <span className='allergies'>({props.data.allergies})</span>
                                                    </>}
                    </div>
                    
                    {props.data.preDescription &&   <>
                                                        <span className='pre-description'>{props.data.preDescription};&nbsp;</span>
                                                    </>}
                    {props.data.description &&  <>
                                                    <span className="description">{props.data.description}</span>
                                                </>}
                    <span className="price">&nbsp;&nbsp;{props.data.price}</span>
                    {props.data.name == 'cochinillo' && <div style={{fontStyle:'italic'}}>(please allow 40 minutes cooking time)</div>}                                    
                </>}

            
            
            <span   id='manager-edit-buttons' 
                    style={{display:'flex',
                            justifyContent:'space-between',
                            maxWidth:'1.5in'}}>
                
                {props.data.sequence != 0 && 
                    <button onClick={()=>editButtonClick(   props.data._id,
                                                            props.data.cloudinary_url,
                                                            props.data.cloudinary_public_id,
                                                            props.data.section, 
                                                            props.data.name,
                                                            props.data.allergies,
                                                            props.data.preDescription,
                                                            props.data.description,
                                                            props.data.price
                    )} 
                            style={{fontSize:'9px',
                                    background:'blue',
                                    color:'white',
                                    margin:'0',
                                    padding:'0.5em 0.25em'}}>EDIT</button>
                }
                
                {props.data.sequence == 0 ? <>
                                                <button onClick={()=>UNarchiveDinnerMenuItem(props.data._id)}
                                                        style={{fontSize:'9px',
                                                                background:'yellow',
                                                                margin:'0',
                                                                padding:'0.5em 0.25em'}}>UNARCHIVE</button>                                            </> : 
                                            <>
                                                <button onClick={()=>archiveDinnerMenuItem(props.data._id,props.data.name)}
                                                        style={{fontSize:'9px',
                                                                background:'yellow',
                                                                margin:'0',
                                                                padding:'0.5em 0.25em'}}>ARCHIVE</button>                            
                                            </>}
                
                <button onClick={()=>deleteDinnerMenuItem(props.data._id,props.data.name)}
                        style={{fontSize:'9px',
                                background:'red',
                                color:'white',
                                margin:'0',
                                padding:'0.5em 0.25em'}}>DELETE</button>
            </span>
            
            {props.data.section != 'Sides' && props.data.sequence != props.sectionLength &&
                <div style={{textAlign:'center'}}>
                    <BiSolidUpArrow size={30} 
                                    onClick={()=>moveDown(props.data._id)}
                                    style={{color:'green',
                                            transform:'rotate(180deg)',
                                            cursor:'pointer'}} />
                </div>
            }
            
            <br/>
        </div>
        
    )
}