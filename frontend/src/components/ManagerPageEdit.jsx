import { FaToggleOff } from "react-icons/fa6"

export default function ManagerPageEdit(props){
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
            
            <h1>Manager Page Edit</h1>
        </>
    )
}