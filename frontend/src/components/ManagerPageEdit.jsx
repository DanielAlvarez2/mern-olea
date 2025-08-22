import { FaToggleOff } from "react-icons/fa6"
import {useEffect, useState} from 'react'

export default function ManagerPageEdit(props){

    const [dinnerItems, setDinnerItems] = useState([])
    const [archiveLength, setArchiveLength] = useState(0)

    const getDinnerItems = ()=>{
        fetch(`${BASE_URL}/api/dinner`)
            .then(res=>res.json())
            .then(json=>setDinnerItems(json))
            .catch(err=>console.log(err))
        setArchiveLength(dinnerItems.filter(item=>item.sequence == 0).length)
    }
    
    useEffect(()=>getDinnerItems(),[])
    
    return(
        <>
            <header id='manager-page-header'>                        
                <h1 id='manager'>MANAGER</h1>
                                    
                <span id='toggle-menu'>
                    
                    Edit Mode 
                                        
                    <FaToggleOff    size='30'
                                    id='toggle-icon' 
                                    onClick={props.flipToggle} />
                                        
                    Print Preview
                </span>
            
                <span>
                    <button onClick={props.showForm}>+ Item</button>
                </span>
            </header>
            
            <div className='logo'>olea</div>
            <hr/>

            
        </>
    )
}