import { FaToggleOff } from "react-icons/fa6"

export default function ManagerPagePrint(props){
    return(
        <>
            <header id='manager-page-header'>                        
                <h1 id='manager'>MANAGER</h1>
                                    
                <span id='toggle-menu'>
                    Edit Mode 
                    
                    <FaToggleOff    size='30'
                                    style={{transform:'rotate(180deg)'}}
                                    id='toggle-icon' 
                                    onClick={props.flipToggle} />
                    
                    Print Preview
                </span>
            
                <span>
                    <button onClick={()=>window.print()}>Print</button>
                </span>
            </header>

            <h1>Manager Page Print</h1>
        </>
    )
}