import { useState, useEffect } from 'react'
import './Home.css'
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
              <h1><span id='logo'>olea</span></h1>
              <div id='nav-links' style={{width:'100%',border:'1px solid green'}}>
                <ul style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',height:'100%'}}>
                  <li key='home'>home</li>
                  <li key='info'>info</li>
                  <li key='menus'>menus</li>
                  <li key='press'>press</li>
                  <li key='gift-cards'>gift cards</li>
                  <li key='newsletter'>newsletter</li>
                  <li key='reservations'>reservations</li>
                </ul>  
              </div>{/* #nav-links */}
              <div id='socials' style={{display:'flex',gap:'10px',alignItems:'center'}}>
                <FaFacebookF className='icon' />
                <FaTwitter className='icon' />
                <FaInstagram className='icon' />
              </div>{/* #socials */}
            </nav>
            <hr/>
            <div id='main'>
              <div id='main-left'>
                <h2>dinner hours</h2>
                Tuesday - Saturday, 5 - 10pm<br/>
                last reservation is at 8:30pm<br/>
                closed Sunday and Monday<br/><br/>

                <h2>takeout and curbside pickup</h2>
                Our dinner menu below is avilable for takeout and curbside pickup. Please preorder if possible by phone (203.780.8925). <br/>
                During special days we can only take a limited number of takeout orders due to volume.<br/><br/>

                <h2>CHEF'S TASING MENU <span>$105 / person</span></h2>
                <h2>no substitutions or modifications</h2>
                <h2>A minimum of two days notice is required</h2>
                six courses / reservations and full table participation required<br/>
                optional wine pairing available $52 / person<br/>
                available Tuesday through Thursday<br/>
                Please let us know in advance about any food restrictions or allergies.<br/>
                Tax and gratuity not included.<br/><br/>

                <h2>DINNER MENU</h2>

                <div className='menu-section' style={{textAlign:'center'}}>appetizers</div>

                {dinnerItems.filter(item=>item.section == 'Meats').map(data=>{
                  return(
                    <>
                      <div style={{marginTop:'20px',display:'flex',justifyContent:'space-between'}}>
                        <span className='name'>{data.name}</span>
                        <span className='price'>{data.price}</span>
                      </div>
                        {data.preDescription} 
                        {data.description}
                    </>
                  )
                })}

                {dinnerItems.filter(item=>item.section == 'Appetizers').map(data=>{
                  return(
                    <>
                      <div style={{marginTop:'20px',display:'flex',justifyContent:'space-between'}}>
                        <span className='name'>{data.name}</span>
                        <span className='price'>{data.price}</span>
                      </div>
                        <span className='pre-description'>{data.preDescription};&nbsp;</span>  
                        <span className='description'>{data.description}</span>
                    </>
                  )
                })}

                <div className='menu-section' style={{textAlign:'center'}}>main courses</div>

                {dinnerItems.filter(item=>item.section == 'Entrées').map(data=>{
                  return(
                    <>
                      <div style={{marginTop:'20px',display:'flex',justifyContent:'space-between'}}>
                        <span className='name'>{data.name}</span>
                        <span className='price'>{data.price}</span>
                      </div>
                        <span className='pre-description'>{data.preDescription};&nbsp;</span>  
                        <span className='description'>{data.description}</span>
                    </>
                  )
                })}

                <div className='menu-section' style={{textAlign:'center'}}>sides</div>

                {dinnerItems.filter(item=>item.section == 'Sides').map(data=>{
                  return(
                    <>
                      <div style={{marginTop:'20px',display:'flex',justifyContent:'space-between'}}>
                        <span className='name'>{data.name}</span>
                        <span className='price'>{data.price}</span>
                      </div>
                        <span className='pre-description'>{data.preDescription};&nbsp;</span>  
                        <span className='description'>{data.description}</span>
                    </>
                  )
                })}       

                <br/><br/><br/>
                we do our best to keep this information accurate and up to date, 
                but because we make frequent adjustmants, based on season and availability, 
                our menus are subject to change<br/><br/>              
              </div>{/* #main-left */}
              <div id='main-right'>
                
                <div id='open-table'>
                  <div id='ot1'>make a reservation</div>
                  <div id='ot2'>POWERED BY OPENTABLE</div><br/>
                  <span id='ot3'>FIND A TABLE</span>
                </div>{/* #open-table */}
              
              </div>{/* #main-right */}
            </div>{/* #main */}
            <hr/>
            <div id='socials-bottom' style={{marginTop:'10px',display:'flex',gap:'10px',justifyContent:'center'}}>
              <FaFacebookF className='icon' />
              <FaTwitter className='icon' />
              <FaInstagram className='icon' />
            </div>{/* #socials-bottom */}                 
          </div>{/* #footer-flexbox-top */}
          <PageFooter color='red' />
          
        </div>{/* #root-page-content */}
        
      </div>{/* #root-page-wrapper */}
      
    </>
  )
}
