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
        <div id='manager-page-form-wrapper'>

        
            <form action={editForm ? editDinnerItem : addDinnerItem}>
                <h2>{editForm ? 'Edit' : 'Create New'} Item</h2><br/><br/>

                <label>
                    Section:&nbsp; 
                    <select required
                            name='section'
                            id='manager-page-section-input' 
                            defaultValue={''}>
                        <option disabled value=''>Select...</option>
                        <option>Meats</option>
                        <option>Appetizers</option>
                        <option>Entrées</option>
                        <option>Sides</option>
                    </select> <span class='required'>*required</span><br/><br/>
                </label>

                <label>
                    Name: <span class='required'>*required</span><br/>
                    <input  type='text'
                            name='name'
                            id='manager-page-name-input' 
                            maxLength={500}
                            required /><br/><br/>
                </label>

                <label>
                    Allergies:<br/>
                    <input  type='text'
                            name='allergies'
                            maxLength={500}
                            id='manager-page-allergies-input' /><br/><br/>
                </label>

                <label>
                    Mini-Description:<br/>
                    <input  type='text'
                            id='manager-page-mini-description-input'
                            maxLength={500}
                            name='preDescription' /><br/><br/>
                </label>

                <label>
                    Main Description:<br/>
                    <textarea   name='description'
                                rows='5'
                                id='manager-page-description-input'
                                maxLength={500}></textarea><br/><br/>
                </label>

                <label>
                    Price: <span class='required'>*required</span><br/>
                    <input  type='text'
                            name='price'
                            id='manager-page-price-input'
                            maxLength={500} 
                            required /><br/><br/>
                </label>

                Photo: (optional)<br/>
                <input type='file' /><br/><br/>

                <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
                    <button style={{background:'lightgreen'}}>Add Item</button>
                    <div className='btn'>Clear Form</div>
                </div>

            </form>
        </div>
        </>
    )
}