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
        <div  id='menu-page-content' 
              style={{padding:'20px',backgroundImage: `url('./menu-background.jpg')`}}>
          <div id='footer-flexbox-top'>
            <h1><span id='logo'>olea</span></h1>
            <hr style={{marginBottom:'20px'}} />
              <div id='menu-top'>
                <div id='menu-top-left'>
                  <div id='meats' style={{border:'1px solid black'}}>
                    {dinnerItems.filter(item=>item.section == 'Meats' && item.sequence).map(data=>{
                      return(
                        <div key={data._id}>
                          <MenuPageItem data={data} />
                        </div>
                      )
                    })}          
                  </div>{/* #meats */}          
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

                  <div id='tasting-menu' style={{fontFamily:'serif',padding:'20px',border:'1px solid black'}}>
                    <span style={{fontFamily:'FuturaLight',fontWeight:'900'}}>
                      chef's tasting menu</span> <span style={{fontStyle:'italic'}}>six courses <span style={{fontWeight:'900'}}>105</span> / person</span><br/>
                    <span style={{fontStyle:'italic',fontWeight:'900'}}>48-hours notice and reservation required</span><br/>
                    full table participation<br/>
                    available tuesday through thursday<br/>
                    <span style={{fontStyle:'italic'}}>optional wine pairing available <span style={{fontWeight:'900'}}>52</span> / person</span><br/>                                                    
                  </div>{/* #tasting-menu */}

                </div>{/* #menu-top-right */}
              
              </div>{/* #menu-top */}
                <h2 style={{fontSize:'30px',fontWeight:'100',paddingLeft:'20px'}}>sides</h2>
              <div id='sides' style={{border:'1px solid black',marginBottom:'20px'}}>
                {dinnerItems.filter(item=>item.section == 'Sides' && item.sequence).map(data=>{
                  return(
                    <div key={data._id}>
                      <MenuPageItem data={data} />
                    </div>
                  )
                })}                                  
              </div>{/* #sides */}
              <hr style={{marginBottom:'20px'}} />
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
