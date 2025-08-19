import './ManagerPageForm.css'
import {useState} from 'react'

export default function ManagerPageForm(){
    const [editForm, setEditForm] = useState(false)

    function addDinnerItem(){

    }

    function editDinnerItem(id){
        
    }
    return(
        <>
            <h1>Manager Page Form</h1>
            <form action={editForm ? editDinnerItem : addDinnerItem}>
                <h2>{editForm ? 'Edit' : 'Create New'} Item</h2>
            </form>
        </>
    )
}