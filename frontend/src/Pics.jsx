import { FaCamera } from "react-icons/fa";
import './menu.css'
import PageFooter from './components/PageFooter.jsx'

export default function Pics(){
    return(
        <>
            <div id='pics-page-wrapper'>
                <div id='pics-page-content'>
                    <FaCamera className='icon' />
                    <nav>
                        <h1 style={{display:'flex'}}><span id='logo'>olea</span></h1>
                    </nav>       
                    <hr/>           
                    <PageFooter color='green' />  
                </div>{/* #pics-page-content */}
            </div>{/* #pics-page-wrapper */}
        </>
    )
}