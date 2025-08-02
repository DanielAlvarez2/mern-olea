import './AdminDinnerMenuItem.css'
import { FaCamera } from "react-icons/fa"
import { AiTwotoneCloseCircle } from "react-icons/ai"


export default function ArchiveDinnerMenuItem(props){
   const BASE_URL =  (process.env.NODE_ENV == 'production') ?
                    'https://mern-olea.onrender.com' : 
                    'http://localhost:1435'

    async function UNarchive(id){
      await fetch(`${BASE_URL}/api/UNarchive/${id}`,{method:'PUT'})
              .then(()=>props.getDinnerItems())
              .catch(err=>console.log(err))
    } 
     function openPic(id){
      document.querySelector(`#${id}`).style.display = 'block'
    }
    function closePic(id){
      document.querySelector(`#${id}`).style.display = 'none'
    }

    return(
        <>
            <div className='archive-menu-item'>
                      {props.data.cloudinary_url && props.editMode && <div  style={{display:'none'}} 
                                                                            id={props.data.cloudinary_public_id}>
                                                                        <div style={{position:'relative',display:'inline-block'}}>
                                                                          <AiTwotoneCloseCircle size='30px'
                                                                                                onClick={()=>closePic(props.data.cloudinary_public_id)} 
                                                                                                style={{position:'absolute',
                                                                                                        top:'0',
                                                                                                        right:'0',
                                                                                                        cursor:'pointer'
                                                                                                        }} />
                                                                        <img  style={{maxWidth:'200px',
                                                                                      maxHeight:'200px',
                                                                                      
                                                                                    }} 
                                                                              src={props.data.cloudinary_url} /></div>
                                                                          
                                                                        
                                                                      </div>}
                      {props.data.cloudinary_url && props.editMode && <div>
                                                                        <FaCamera onClick={()=>openPic(props.data.cloudinary_public_id)} 
                                                                                  style={{cursor:'pointer'}} />
                                                                      </div>}    

                    {props.data.name == 'jamón ibérico' ? 
                      <>
                        <span className='name'>{props.data.name}</span>&nbsp;&nbsp;
                        <span className='price'>{props.data.price}</span>
                        <br/>{props.data.sequence}
                      </>
                      :  
                      <>
                        <span className='name'>{props.data.name}</span>&nbsp;
                        {props.data.allergies && <span className='allergies'>({props.data.allergies})</span>}<br/>
                        {props.data.preDescription && <span className='pre-description'>{props.data.preDescription}; </span>}
                        <span className='description'>{props.data.description}</span>&nbsp;&nbsp;
                        <span className='price'>{props.data.price}</span>
                        {props.data.name == 'cochinillo' && <><br/><span id='cochinillo'>(please allow 40 minutes cooking time)</span></>}
                        <br/>{props.data.sequence}
                      </>
                      }
                      {props.editMode &&   <>                                    
                                        <div className='menu-item-buttons'>
                                            <button onClick={()=>props.deleteArchivedMenuItem(props.data._id)} 
                                                    style={{background:'red',color:'white'}}>Delete</button>
                                            <button onClick={()=>UNarchive(props.data._id)} 
                                                    style={{background:'yellow'}}>UN-Archive</button>
                                        </div>
                                    </>
                      }
            </div>{/* .archive-menu-item */}
        </>
    )
}

  