import { FaToggleOff } from "react-icons/fa6"
import {useEffect, useState} from 'react'
import ManagerDinnerMenuItem from "./ManagerDinnerMenuItem.jsx"
import TastingMenu from "./TastingMenu.jsx"

export default function ManagerPageEdit(props){
    const BASE_URL =    (process.env.NODE_ENV == 'production') ?
                        'https://mern-olea.onrender.com' : 
                        'http://localhost:1435'

    
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
            <hr/><br/>

            <div id='manager-page-menu-top' style={{display:'flex',flexWrap:'wrap',width:'100%'}}>
                <div id='manager-page-menu-top-left' style={{maxWidth:'50%'}}>

                    <div id='manager-page-meats' style={{border:'1px solid black',padding:'3px',margin:'3px'}}>
                        {props.dinnerItems.filter(item=>item.section == 'Meats' && item.sequence).map(data=>{
                            return <ManagerDinnerMenuItem   data={data}
                                                            sectionLength={props.dinnerItems.filter(item=>item.section == 'Meats' && item.sequence).length}
                                                            getDinnerItems={()=>props.getDinnerItems()}
                                                            deleteDinnerMenuItem={()=>deletDinnerMenuItem(data._id,data.name)}
                                                            editDinnerMenuItem={()=>editDinnerMenuItem(data._id)}
                                                            key={data._id}
                                                            editMode={props.editMode} 
                                    />
                        })}
                    </div>{/* #manager-page-meats */}

                    <div id='manager-page-appetizers'>
                        {props.dinnerItems.filter(item=>item.section == 'Appetizers' && item.sequence).map(data=>{
                            return <ManagerDinnerMenuItem   data={data}
                                                            sectionLength={props.dinnerItems.filter(item=>item.section == 'Appetizers' && item.sequence).length}
                                                            getDinnerItems={()=>props.getDinnerItems()}
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
                        {props.dinnerItems.filter(item=>item.section == 'Entrées' && item.sequence).map(data=>{
                            return <ManagerDinnerMenuItem   data={data}
                                                            sectionLength={props.dinnerItems.filter(item=>item.section == 'Entrées' && item.sequence).length}
                                                            getDinnerItems={()=>props.getDinnerItems()}
                                                            deleteDinnerMenuItem={()=>deletDinnerMenuItem(data._id,data.name)}
                                                            editDinnerMenuItem={()=>editDinnerMenuItem(data._id)}
                                                            key={data._id}
                                                            editMode={props.editMode} 
                                    />
                        })}
                    </div>{/* #manager-page-entrées */}

                    <div id='tasting-menu' style={{border:'1px solid black',padding:'3px',margin:'3px'}}>
                        <TastingMenu />    
                    </div>{/* #tasting-menu */}
                
                </div>{/* #manager-page-menu-top-right */}            

            </div>{/* #manager-page-menu-top */}
            <h2>sides</h2>
            <div id='manager-page-menu-bottom' style={{padding:'3px',margin:'3px',border:'1px solid black'}}>
                <div id='manager-page-sides' style={{display:'flex',flexWrap:'wrap'}}>
                        {props.dinnerItems.filter(item=>item.section == 'Sides' && item.sequence).map(data=>{
                            return  <div key={data._id} style={{width:'50%'}}>
                                        <ManagerDinnerMenuItem  data={data}
                                                                sectionLength={props.dinnerItems.filter(item=>item.section == 'Entrées' && item.sequence).length}
                                                                getDinnerItems={()=>props.getDinnerItems()}
                                                                deleteDinnerMenuItem={()=>deletDinnerMenuItem(data._id,data.name)}
                                                                editDinnerMenuItem={()=>editDinnerMenuItem(data._id)}
                                                                // key={data._id}
                                                                editMode={props.editMode} 
                                        />
                                    </div>
                            
                        })}
                </div>{/* #manager-page-sides */}
            </div>{/* #manager-page-menu-bottom */}
            <br/>
            


            {props.dinnerItems.filter(item=>item.sequence == 0).length != 0 && <h2>Archive</h2>}
            
            {props.dinnerItems.filter(item=>item.sequence == 0).map(data=>{
                            return  <div key={data._id} style={{width:'50%'}}>
                                        <ManagerDinnerMenuItem  data={data}
                                                                sectionLength={props.dinnerItems.filter(item=>item.section == 'Entrées' && item.sequence).length}
                                                                getDinnerItems={()=>props.getDinnerItems()}
                                                                deleteDinnerMenuItem={()=>deletDinnerMenuItem(data._id,data.name)}
                                                                editDinnerMenuItem={()=>editDinnerMenuItem(data._id)}
                                                                // key={data._id}
                                                                editMode={props.editMode} 
                                        />
                                    </div>
                            
                        })}
        </>
    )
}