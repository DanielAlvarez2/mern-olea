import './AdminDinnerMenuItem.css'

export default function AdminDinnerMenuItem(props){

     const BASE_URL =  (process.env.NODE_ENV == 'production') ?
                    'https://mern-olea.onrender.com' : 
                    'http://localhost:1435'


                  return(
                    <div className='menu-item'>
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
                                            <button onClick={()=>props.onDeleteClick(props.data._id)} 
                                                    style={{background:'red',color:'white'}}>Delete</button>
                                            <button style={{background:'yellow'}}>Archive</button>
                                            <button onClick={()=>props.onEditClick(props.data._id)}
                                                    style={{background:'blue',color:'white'}}>Edit</button>
                                        </div>
                                    </>
                        } 
                    </div>
                  )


}