import { useState, useEffect } from 'react'
import './admin.css'

export default function Admin() {
  const BASE_URL =  (process.env.NODE_ENV == 'production') ?
                    'https://mern-olea.onrender.com' : 
                    'http://localhost:1435'
  const [dinnerItems, setDinnerItems] = useState([])
  
  const getDinnerItems = ()=>{
    fetch(`${BASE_URL}/api/dinner`)
      .then(res=>res.json())
      .then(json=>setDinnerItems(json))
      .catch(err=>console.log(err))
  }

  async function addDinnerItem(formData){
    alert(BASE_URL)
    await fetch(`${BASE_URL}/api/dinner`,{ method:'POST',
                                headers:{'Content-Type':'application/json'},
                                body: JSON.stringify({
                                  section: formData.get('section'),
                                  name: formData.get('name'),
                                  allergies: formData.get('allergies'),
                                  preDescription: formData.get('preDescription'),
                                  description: formData.get('description'),
                                  price: formData.get('price')
                                })
    }).then(console.log(`Added to Database: ${formData.get('name')}`))
      .then(async ()=> await getDinnerItems())
      .catch(err=>console.log(err))
  }

  useEffect(()=>getDinnerItems(),[])

  return (
    <>
      <div id='admin-page-wrapper-dinner-menu'>
        
        <div id='admin-header'>
          <h2>Admin Page</h2>
        </div>{/* #admin-header */}
        
        <div id='admin-dinner-menu'>
          <h1>olea</h1>
          <hr />
          {dinnerItems.map(data=>{
            return(
              <div>
                {data.name}
              </div>
            )
          })}

        </div>{/* #admin-dinner-menu */}

        <div id='admin-form-outer-wrapper'>
          <div id='admin-form-inner-wrapper'>
            <form action={addDinnerItem} id='admin-form'>
              <h2>Create New Item</h2><br/>

              <label>
                Section:&nbsp;&nbsp; 
                <select name='section'>
                  <option>Section...</option>
                  <option>Meats</option>
                  <option>Appetizers</option>
                  <option>Entrées</option>
                  <option>Sides</option>
                </select><br/><br/>
              </label>

              <label>
                Name:<br/>
                <input type='text' name='name' /><br/><br/>
              </label>

              <label>
                Allergies:<br/>
                <input type='text' name='allergies' /><br/><br/>
              </label>

              <label>
                Mini-Description:<br/>
                <input type='text' name='preDescription' /><br/><br/>
              </label>

              <label>
                Main Description:<br/>
                <textarea name='description'>Description</textarea><br/><br/>
              </label>

              <label>
                Price:<br/>
                <input type='text' name='price' /><br/><br/>
              </label>

              <label>
                Photo: (optional)<br/>
                <input type='file' name='image' /><br/><br/>
              </label>

              <button type='submit' className='admin-form-btn'>Add Item</button>

              <div className='admin-form-btn'>Clear Form</div>

            </form>{/* #admin-form */}
          </div>{/* #admin-form-inner-wrapper */}
        </div>{/* #admin-form-outer-wrapper */}      
      </div>{/* #page-wrapper-admin-dinner-menu */}
    </>
  )
}
