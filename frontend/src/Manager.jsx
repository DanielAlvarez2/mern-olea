import {useState,useEffect} from 'react'
import './Manager.css'
import PageFooter from './components/PageFooter.jsx'
import AdminDinnerMenuItem from './components/AdminDinnerMenuItem.jsx'
import {FaToggleOff} from 'react-icons/fa6'
import {FaCaretSquareUp} from 'react-icons/fa'
import {MdDoNotDisturb} from 'react-icons/md'

export default function Manager(){
    const BASE_URL =    (process.env.NODE_ENV == 'production') ?
                        'https://mern-olea.onrender.com' :
                        'http://localhost:1435'
    const [dinnerItems, setDinnerItems] = useState([])
    const [editForm, setEditForm] = useState(false)
    const [whitespaceVertical, setWhitespaceVertical] = useState(0)
    const [whitespaceHorizontal, setWhitespaceHorixontal] = useState(0)
    const [editMode, setEditMode] = useState(true)
    const [archiveLength, setArchiveLength] = useState(0)
    const [previewSource, setPreviewSource] = useState('')
    const [oldPic, setOldPic] = useState('')
    const [oldPicURL, setOldPicURL] = useState('')
    const [oldPicID, setOldPicID] = useState('')
    const [isChecked, setIsChecked] = useState(false)

    useEffect(()=>getVerticalWhitespace(),[])
    useEffect(()=>getHorizontalWhitespace(),[])
    useEffect(()=>getDinnerItems(),[])

    return(
        <h1>MANAGER</h1>
    )
}