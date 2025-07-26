import { useState, useEffect } from 'react'
import './root.css'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import PageFooter from './components/PageFooter.jsx'

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
        <div id='root-page-content'>
          <div id='footer-flexbox-top'>
            <nav style={{display:'flex',width:'100%',border:'1px solid red',justifyContent:'space-between'}}>
              <h1>olea</h1>
              <div id='nav-links' style={{width:'100%',border:'1px solid green'}}>
                <ul style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                  <li key='home'>home</li>
                  <li key='info'>info</li>
                  <li key='menus'>menus</li>
                  <li key='press'>press</li>
                  <li key='gift-cards'>gift cards</li>
                  <li key='newsletter'>newsletter</li>
                  <li key='reservations'>reservations</li>
                </ul>  
              </div>{/* #nav-links */}
              <div id='socials' style={{display:'flex'}}>
                <FaFacebookF className='icon' />
                <FaTwitter className='icon' />
                <FaInstagram className='icon' />
              </div>{/* #socials */}
            </nav>
            <hr/>
            {dinnerItems.map(data=>{
              return(
                <div>
                  {data.name}
                </div>
              )
            })}
          </div>{/* #footer-flexbox-top */}
          <PageFooter color='red' />
          
        </div>{/* #root-page-content */}
        
      </div>{/* #root-page-wrapper */}
      
    </>
  )
}
