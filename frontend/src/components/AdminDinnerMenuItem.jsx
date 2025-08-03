import './AdminDinnerMenuItem.css'
import { BiSolidUpArrow } from "react-icons/bi"
import { FaCamera } from "react-icons/fa"
import { AiTwotoneCloseCircle } from "react-icons/ai"

export default function AdminDinnerMenuItem(props){

     const BASE_URL =  (process.env.NODE_ENV == 'production') ?
                    'https://mern-olea.onrender.com' : 
                    'http://localhost:1435'

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

    async function archive(id){
      await fetch(`${BASE_URL}/api/archive/${id}`)
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
                    <div  className='menu-item'
                          style={{marginTop:props.marginVertical,
                                  marginBottom: !(props.data.section == 'Sides' && props.data.sequence == 1) && 
                                                !(props.data.section == 'Sides' && props.data.sequence == 2) && 
                                                props.marginVertical,
                                  paddingLeft:props.paddingHorizontal,
                                  paddingRight:props.paddingHorizontal,
                                }}>
                      {(!(props.data.section == 'Sides' || props.data.sequence == 1) && props.editMode) && 
                        <div style={{width:'100%',textAlign:'center'}}>
                          <BiSolidUpArrow onClick={()=>moveUp(props.data._id)} 
                                          style={{cursor:'pointer'}} />
                        </div>
                      }      
                      {(props.data.section == 'Sides' && props.editMode) &&
                        <div style={{ display:'flex',
                                      justifyContent:'space-between',
                                      paddingRight:props.paddingHorizontal}}>
                          <span>
                            {props.data.sequence != 1 && <BiSolidUpArrow onClick={()=>moveUp(props.data._id)} 
                                                                        style={{cursor:'pointer',
                                                                                transform:'rotate(-90deg)'}} />}
                          </span>
                          <span>
                            {props.data.sequence != props.sectionLength && <BiSolidUpArrow onClick={()=>moveDown(props.data._id)} 
                                                                                            style={{cursor:'pointer',
                                                                                                    transform:'rotate(90deg)'}} />}
                          </span>
                        </div>
                      }  
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
                        
                      </>
                      :  
                      <>
                        <span className='name'>{props.data.name}</span>&nbsp;
                        {props.data.allergies && <span className='allergies'>({props.data.allergies})</span>}<br/>
                        {props.data.preDescription && <span className='pre-description'>{props.data.preDescription}; </span>}
                        <span className='description'>{props.data.description}</span>&nbsp;&nbsp;
                        <span className='price'>{props.data.price}</span>
                        {props.data.name == 'cochinillo' && <><br/><span id='cochinillo'>(please allow 40 minutes cooking time)</span></>}
                        
                      </>
                      }
                      {props.editMode &&   <>                                    
                                        <div className='menu-item-buttons'>
                                            <button onClick={()=>props.onDeleteClick(props.data._id)} 
                                                    style={{background:'red',color:'white'}}>Delete</button>
                                            <button onClick={()=>archive(props.data._id)} 
                                                    style={{background:'yellow'}}>Archive</button>
                                            <button onClick={()=>props.onEditClick(props.data._id)}
                                                    style={{background:'blue',color:'white'}}>Edit</button>
                                        </div>
                                    </>
                      } 
                     
                      {(!(props.data.section == 'Sides' || props.data.sequence == props.sectionLength) && props.editMode) && 
                        <div style={{width:'100%',textAlign:'center'}}>
                          <BiSolidUpArrow onClick={()=>moveDown(props.data._id)} 
                                          style={{transform:'rotate(180deg)',cursor:'pointer'}} />
                        </div>
                      }
                    </div>
                  )


}