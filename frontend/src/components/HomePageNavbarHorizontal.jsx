export default function HomePageNavbarHorizontal(){
    return(
        <>
                          <div id='nav-links' style={{width:'100%'}}>
                            <ul style={{width:'100%',display:'flex',gap:'20px',alignItems:'center',height:'100%'}}>
                              <li key='home'>home</li>
                              <li key='info'>info</li>
                              <li key='menus'>menus</li>
                              <li key='press'>press</li>
                              <li key='gift-cards'>gift cards</li>
                              <li key='newsletter'>newsletter</li>
                              <li key='reservations'>reservations</li>
                            </ul>  
                          </div>{/* #nav-links */}
            
        </>
    )
}