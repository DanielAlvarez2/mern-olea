import { useState, useEffect } from 'react'
import './menu.css'
import PageFooter from './components/PageFooter.jsx'
import MenuPageItem from './components/MenuPageItem.jsx'

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
        <div id='menu-page-content' style={{backgroundImage: `url('./menu-background.jpg')`}}>
          <div id='footer-flexbox-top'>
            <h1><span id='logo'>olea</span></h1>
            <hr/>
              <div id='menu-top'>
                <div id='menu-top-left'>
                  {dinnerItems.filter(item=>item.section == 'Meats' && item.sequence).map(data=>{
                    return(
                      <div key={data._id}>
                        <MenuPageItem data={data} />
                      </div>
                    )
                  })}                    
                  {dinnerItems.filter(item=>item.section == 'Appetizers' && item.sequence).map(data=>{
                    return(
                      <div key={data._id}>
                        <MenuPageItem data={data} />
                      </div>
                    )
                  })}                                    
                </div>{/* #menu-top-left */}
                <div id='menu-top-right'>
                  {dinnerItems.filter(item=>item.section == 'Entrées' && item.sequence).map(data=>{
                    return(
                      <div key={data._id}>
                        <MenuPageItem data={data} />
                      </div>
                    )
                  })}                                    
                </div>{/* #menu-top-right */}
              </div>{/* #menu-top */}
              <div id='sides'>
                {dinnerItems.filter(item=>item.section == 'Sides' && item.sequence).map(data=>{
                  return(
                    <div key={data._id}>
                      <MenuPageItem data={data} />
                    </div>
                  )
                })}                                  
              </div>{/* #sides */}
              <hr/>
              <div id='menu-page-footer'>
                <div>manuel romero, chef</div>  
                <div id='legal'>
                consumer advisory: consumption of undercooked meat, poultry, eggs, or seafood may increase the risk of food-borne illnesses<br/>
                all menu items are subject to change according to seasonality and avilability<br/>
                <div>
                  please alert your server if you have special dietary requirements before ordering:<br/> 
                  gl (gluten), d (dairy), n (nuts)
                </div>
              </div>{/* #legal */}  
              </div>{/* #menu-page-fotter */}
          </div>{/* #footer-flexbox-top */}        
        </div>{/* #menu-page-content */}
          <PageFooter color='grey' />
        
      </div>{/* #menu-page-wrapper */}
    </>
  )
}
