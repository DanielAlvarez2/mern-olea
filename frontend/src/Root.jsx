import { useState, useEffect } from 'react'
import './root.css'

export default function Root() {
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
      <div id='root-page-wrapper'>
        <nav style={{display:'flex'}}>
          <h1>olea</h1>
          <div id='nav-links'>
            <ul style={{display:'flex'}}>
              <li key='home'>home</li>
              <li key='info'>info</li>
              <li key='menus'>menus</li>
              <li key='press'>press</li>
              <li key='gift-cards'>gift cards</li>
              <li key='newsletter'>newsletter</li>
              <li key='reservations'>reservations</li>
            </ul>  
          </div>{/* #nav-links */}
        </nav>
        
        {dinnerItems.map(data=>{
          return(
            <div>
              {data.name}
            </div>
          )
        })}
      </div>{/* #root-page-wrapper */}
      
    </>
  )
}
