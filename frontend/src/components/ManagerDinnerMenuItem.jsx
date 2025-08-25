import './ManagerDinnerMenuItem.css'
import { FaCamera } from "react-icons/fa"
import { AiTwotoneCloseCircle } from "react-icons/ai"

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

    function showPhoto(){

    }

    function closeModal(id){
        document.querySelector(`#photo-${id}`).style.display = 'none'
    }
    return(
        <div><br/>
            {props.data.cloudinary_url && <FaCamera style={{cursor:'pointer'}}
                                                    size={20}
                                                    onClick={()=>alert('photo')} />}
            <div className='photo-modal' id={`photo-${props.data._id}`}>
                <AiTwotoneCloseCircle   size={40}
                                        onClick={()=>closeModal(props.data._id)} 
                                        style={{position:'absolute',
                                                top:'0',
                                                right:'0',
                                                cursor:'pointer'}} />
                <div>
                    <img className='modal-pic' src={props.data.cloudinary_url} /><br/>
                    {props.data.name}
                </div>
            </div>
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
            <span id='manager-edit-buttons' style={{  display:'flex',
                            justifyContent:'space-between',
                            maxWidth:'1.5in'}}>
                {props.data.sequence != 0 && 
                    <button style={{fontSize:'9px',
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
            <br/>
        </div>
        
    )
}