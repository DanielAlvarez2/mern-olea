import { useState, useEffect } from 'react'
import './menu.css'
import PageFooter from './components/PageFooter.jsx'

export default function Menu() {
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

  useEffect(()=>getDinnerItems(),[])

  return (
    <>
      <div id='menu-page-wrapper'>
        <div id='menu-page-content'>
          <div id='footer-flexbox-top'>
            <h1><span id='logo'>olea</span></h1>
            <hr/>
              {dinnerItems.map(data=>{
                return(
                  <div key={data._id}>
                    {data.name}
                  </div>
                )
              })}                    
          </div>{/* #footer-flexbox-top */}        
        </div>{/* #menu-page-content */}
          <PageFooter color='grey' />
        
      </div>{/* #menu-page-wrapper */}
    </>
  )
}
