import { FaToggleOff } from "react-icons/fa6"

export default function ManagerPagePrint(props){

    const BASE_URL =    (process.env.NODE_ENV == 'production') ?
                        'https://mern-olea.onrender.com' : 
                        'http://localhost:1435'

 
    return(
        <>
            <header className='manager-page-header'>                        
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

            <div id='manager-print-dinner-menu' style={{width:'8.5in',height:'in',background:'purple'}}>

            </div>{/* #manager-print-dinner-menu */}
            <h1>Manager Page Print</h1>
        </>
    )
}