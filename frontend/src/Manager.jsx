import {useState,useEffect} from 'react'
import './Manager.css'
import ManagerPageEdit from './components/ManagerPageEdit.jsx'
import ManagerPageForm from './components/ManagerPageForm.jsx'
import ManagerPagePrint from './components/ManagerPagePrint.jsx'


export default function Manager(){

    const BASE_URL =    (process.env.NODE_ENV == 'production') ?
                        'https://mern-olea.onrender.com' : 
                        'http://localhost:1435'


    function flipToggle(){
        if (editMode){
            document.querySelector('#toggle-icon').style.transform = 'rotate(180deg'
        }else{
            document.querySelector('#toggle-icon').style.transform = 'rotate(0deg'
        }
        setEditMode(prev=>!prev)
    }

    function showForm(){
        document.querySelector('#manager-page-form').style.display = 'block'
        document.querySelector('#manager-page-wrapper main').style.display = 'none'
    }

    const [editMode, setEditMode] = useState(true)
    return(
        <>
            <div className='page-wrapper' id='manager-page-wrapper'>
                <main>
                    
                    {editMode ? <ManagerPageEdit    flipToggle={()=>flipToggle()}
                                                    showForm={()=>showForm()} /> : 
                                <ManagerPagePrint flipToggle={()=>flipToggle()} />}
                </main>

                <div id='manager-page-form'>
                    <ManagerPageForm />
                </div>
            </div>
        </>
    )
}