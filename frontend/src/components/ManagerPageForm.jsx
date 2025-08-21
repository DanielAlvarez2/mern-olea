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

                Section:&nbsp;
                <select>
                    <option disabled>Select Section...</option>
                    <option>Meats</option>
                    <option>Appetizers</option>
                    <option>Entrées</option>
                </select><br/><br/>

                Name:<br/>
                <input type='text' /><br/><br/>

                Allergies:<br/>
                <input type='text' /><br/><br/>

                Mini-Description:<br/>
                <input type='text' /><br/><br/>

                Main Description:<br/>
                <textarea></textarea><br/><br/>

                Price:<br/>
                <input type='text' /><br/><br/>

                Photo: (optional)<br/>
                <input type='file' /><br/><br/>

                <button>Add Item</button><br/><br/>
                
                <div className='.btn'>Clear Form</div>
            </form>
        </>
    )
}