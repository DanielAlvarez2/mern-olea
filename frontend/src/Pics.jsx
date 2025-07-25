import { FaCamera } from "react-icons/fa";
import './menu.css'

export default function Pics(){
    return(
        <>
            <div id='pics-page-wrapper'>
                <div id='pics-page-content'>
                    <FaCamera className='icon' />
                    <nav>
                        <h1 style={{display:'flex'}}>olea</h1>
                    </nav>       
                    <hr/>             
                </div>{/* #pics-page-content */}
            </div>{/* #pics-page-wrapper */}
        </>
    )
}