import {useState,useEffect} from 'react'
import './Manager.css'
import ManagerPageEdit from './components/ManagerPageEdit.jsx'
import ManagerPageForm from './components/ManagerPageForm.jsx'
import ManagerPagePrint from './components/ManagerPagePrint.jsx'


export default function Manager(){

    const BASE_URL =    (process.env.NODE_ENV == 'production') ?
                        'https://mern-olea.onrender.com' : 
                        'http://localhost:1435'

    const [dinnerItems, setDinnerItems] = useState([])
    const [archiveLength, setArchiveLength] = useState(0)
    const [editMode, setEditMode] = useState(true)
    const [editForm, setEditForm] = useState(false)
    const [oldPic, setOldPic] = useState(false)
    const [oldPicURL, setOldPicURL] = useState('')
    const [oldPicID, setOldPicID] = useState('')

    useEffect(()=>getDinnerItems(),[])

    const getDinnerItems = ()=>{
        fetch(`${BASE_URL}/api/dinner`)
            .then(res=>res.json())
            .then(json=>setDinnerItems(json))
            .catch(err=>console.log(err))
        setArchiveLength(dinnerItems.filter(item=>item.sequence == 0).length)
    }

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



    return(
        <>
            <div className='page-wrapper' id='manager-page-wrapper'>
                <main>
                    
                    {editMode ? <ManagerPageEdit    flipToggle={()=>flipToggle()}
                                                    dinnerItems={dinnerItems} 
                                                    getDinnerItems={()=>getDinnerItems()}
                                                    showForm={()=>showForm()}
                                                    editForm={editForm}
                                                    setEditForm={setEditForm}
                                                    editMode={editMode} 
                                                    oldPic={oldPic}
                                                    setOldPic={setOldPic}
                                                    oldPicURL={oldPicURL}
                                                    setOldPicURL={setOldPicURL}
                                                    oldPicID={oldPicID}
                                                    setOldPicID={setOldPicID}
                                                    /> : 
                                <ManagerPagePrint flipToggle={()=>flipToggle()} />}
                </main>

                <div id='manager-page-form'>
                    <ManagerPageForm    dinnerItems={dinnerItems} 
                                        editForm={editForm}
                                        setEditForm={setEditForm}
                                        getDinnerItems={()=>getDinnerItems()} 
                                        oldPic={oldPic}
                                        setOldPic={setOldPic}
                                        oldPicURL={oldPicURL}
                                        setOldPicURL={setOldPicURL}
                                        oldPicID={oldPicID}
                                        setOldPicID={setOldPicID}
                                        />
                </div>
            </div>
        </>
    )
}