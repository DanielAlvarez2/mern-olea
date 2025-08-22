import { FaToggleOff } from "react-icons/fa6"
import {useEffect, useState} from 'react'
import ManagerDinnerMenuItem from "./ManagerDinnerMenuItem.jsx"

export default function ManagerPageEdit(props){
    const BASE_URL =    (process.env.NODE_ENV == 'production') ?
                        'https://mern-olea.onrender.com' : 
                        'http://localhost:1435'

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

            <div id='manager-page-menu-top' style={{display:'flex',flexWrap:'wrap',width:'100%'}}>
                <div id='manager-page-menu-top-left' style={{maxWidth:'50%'}}>

                    <div id='manager-page-meats'>
                        {dinnerItems.filter(item=>item.section == 'Meats' && item.sequence).map(data=>{
                            return <ManagerDinnerMenuItem   data={data}
                                                            sectionLength={dinnerItems.filter(item=>item.section == 'Meats' && item.sequence).length}
                                                            getDinnerItems={()=>getDinnerItems()}
                                                            deleteDinnerMenuItem={()=>deletDinnerMenuItem(data._id,data.name)}
                                                            editDinnerMenuItem={()=>editDinnerMenuItem(data._id)}
                                                            key={data._id}
                                                            editMode={props.editMode} 
                                    />
                        })}
                    </div>{/* #manager-page-meats */}

                    <div id='manager-page-appetizers'>
                        {dinnerItems.filter(item=>item.section == 'Appetizers' && item.sequence).map(data=>{
                            return <ManagerDinnerMenuItem   data={data}
                                                            sectionLength={dinnerItems.filter(item=>item.section == 'Appetizers' && item.sequence).length}
                                                            getDinnerItems={()=>getDinnerItems()}
                                                            deleteDinnerMenuItem={()=>deletDinnerMenuItem(data._id,data.name)}
                                                            editDinnerMenuItem={()=>editDinnerMenuItem(data._id)}
                                                            key={data._id}
                                                            editMode={props.editMode} 
                                    />
                        })}
                    </div>{/* #manager-page-appetizers */}
                
                </div>{/* #manager-page-menu-top-left */}            
                <div id='manager-page-menu-top-right' style={{maxWidth:'50%'}}>

                    <div id='manager-page-entrées'>
                        {dinnerItems.filter(item=>item.section == 'Entrées' && item.sequence).map(data=>{
                            return <ManagerDinnerMenuItem   data={data}
                                                            sectionLength={dinnerItems.filter(item=>item.section == 'Entrées' && item.sequence).length}
                                                            getDinnerItems={()=>getDinnerItems()}
                                                            deleteDinnerMenuItem={()=>deletDinnerMenuItem(data._id,data.name)}
                                                            editDinnerMenuItem={()=>editDinnerMenuItem(data._id)}
                                                            key={data._id}
                                                            editMode={props.editMode} 
                                    />
                        })}
                    </div>{/* #manager-page-appetizers */}
                
                </div>{/* #manager-page-menu-top-right */}            

            </div>{/* #manager-page-menu-top */}
        </>
    )
}