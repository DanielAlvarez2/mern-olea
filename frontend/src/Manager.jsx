import {useState,useEffect} from 'react'
import './Manager.css'
import { FaToggleOff } from "react-icons/fa6"
import ManagerPageEdit from './components/ManagerPageEdit.jsx'
import ManagerPageForm from './components/ManagerPageForm.jsx'
import ManagerPagePrint from './components/ManagerPagePrint.jsx'


export default function Manager(){

    function flipToggle(){
        if (editMode){
            document.querySelector('#toggle-icon').style.transform = 'rotate(180deg'
        }else{
            document.querySelector('#toggle-icon').style.transform = 'rotate(0deg'
        }
        setEditMode(prev=>!prev)
    }

    const [editMode, setEditMode] = useState(true)
    return(
        <>
            <div className='page-wrapper' id='manager-page-wrapper'>
                <main>
                    <header id='manager-page-header'>                        
                        <h1 id='manager'>MANAGER</h1>
                        <span id='toggle-menu'>
                            Edit Mode 
                            <FaToggleOff    size='30'
                                            id='toggle-icon' 
                                            onClick={flipToggle} />
                            Print Preview
                        </span>

                        <span>
                            <button>+ Item</button>
                        </span>
                    </header>

                    {editMode ? <ManagerPageEdit /> : <ManagerPagePrint />}
                </main>

                <div id='manager-page-form'>
                    <ManagerPageForm />
                </div>
            </div>
        </>
    )
}