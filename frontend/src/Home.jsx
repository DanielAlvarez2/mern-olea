import { useState, useEffect } from 'react'
import './Home.css'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import PageFooter from './components/PageFooter.jsx'
import OpenTable from './components/OpenTable.jsx'
import HomePageNavbarHorizontal from './components/HomePageNavbarHorizontal.jsx'
import { GiHamburgerMenu } from "react-icons/gi"

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
            <nav style={{ display:'flex',
                          position:'relative',
                          width:'100%',
                          paddingTop:'20px',
                          justifyContent:'space-between'}}>
              <div id='hamburger-menu'><GiHamburgerMenu /></div>
              <h1><span id='logo'>olea</span></h1>
              <div id='nav-menu-laptop'>
                <HomePageNavbarHorizontal />
              </div>
              <div id='socials' style={{display:'flex',gap:'10px',alignItems:'center',padding:'0 48px'}}>
                <FaFacebookF className='icon' />
                <FaTwitter className='icon' />
                <FaInstagram className='icon' />
              </div>{/* #socials */}
            </nav>
              <div id='nav-menu-tablet'>
                <HomePageNavbarHorizontal />
              </div>{/* #home-page-navbar-tablet */}
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
                      <div style={{width:'calc(100% - 4ch)'}}>
                        <span className='pre-description'>{data.preDescription};&nbsp;</span>  
                        <span className='description'>{data.description}</span>
                      </div>
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
                      <div style={{width:'calc(100% - 4ch)'}}>
                        <span className='pre-description'>{data.preDescription};&nbsp;</span>  
                        <span className='description'>{data.description}</span>
                      </div>
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
                      <div style={{width:'calc(100% - 4ch)'}}>
                        <span className='pre-description'>{data.preDescription};&nbsp;</span>  
                        <span className='description'>{data.description}</span>
                      </div>
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
                      <div style={{width:'calc(100% - 4ch)'}}>
                        <span className='pre-description'>{data.preDescription};&nbsp;</span>  
                        <span className='description'>{data.description}</span>
                      </div>
                    </>
                  )
                })}       

                <br/><br/><br/>
                we do our best to keep this information accurate and up to date, 
                but because we make frequent adjustments, based on season and availability, 
                our menus are subject to change<br/><br/>              
              </div>{/* #main-left */}

              <div id='main-right' style={{background:'blue',position:'relative'}}>
                
                <div id='open-table-fixed' style={{position:'sticky',top:'0.5in'}}>
                  <OpenTable />
                </div>
              
              </div>{/* #main-right */}
            </div>{/* #main */}
            <hr/>
            <div id='home-page-footer' style={{padding:'0 0.5in'}}>
              <div id='socials-bottom' style={{marginTop:'10px',display:'flex',gap:'10px'}}>
                <FaFacebookF className='icon' />
                <FaTwitter className='icon' />
                <FaInstagram className='icon' />
              </div>{/* #socials-bottom */} <br/>
              39 high street, new haven, connecticut | 203.780.8925<br/><br/>
              Tuesday-Saturday, 5-10pm (last seating at 8:30)<br/><br/>
              In the heart of downtown New Haven, Olea offers an innovative interpretation of Spanish and Mediterranean cuisine. 
              Chef Manuel Romero and his team explore these flavors in their food, wine, and cocktails, locally sourcing many products and importing specialty items from the Mediterranean region.<br/><br/>
              copyright 2014-2024 by olea. graphic design by Rebecca Martz

            </div>{/* #home-page-footer */}
          </div>{/* #footer-flexbox-top */}
          <PageFooter color='red' />
          
        </div>{/* #root-page-content */}
        
      </div>{/* #root-page-wrapper */}
      
    </>
  )
}
