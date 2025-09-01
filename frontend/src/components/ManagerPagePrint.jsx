import { FaToggleOff } from "react-icons/fa6"

export default function ManagerPagePrint(props){

    const BASE_URL =    (process.env.NODE_ENV == 'production') ?
                        'https://mern-olea.onrender.com' : 
                        'http://localhost:1435'

 
    return(
        <>
            <header style={{width:'8.5in',
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'space-between'}}>                        
                <h1 id='manager'>MANAGER</h1>
                                    
                <span id='toggle-menu'>
                    Edit Mode 
                    
                    <FaToggleOff    size='30'
                                    style={{transform:'rotate(180deg)'}}
                                    id='toggle-icon' 
                                    onClick={props.flipToggle} />
                    
                    Print Preview
                </span>
            
                <span>
                    <button onClick={()=>window.print()}>Print</button>
                </span>
            </header>

















            <div    id='manager-print-dinner-menu' 
                    style={{width:'8.5in',
                            height:'14in',
                            background:'#dab1da',
                            backgroundImage:'url(./olea-dinner-menu-scan.jpg)',
                            backgroundSize:'8.5in 14in',
                            padding:'30px 60px',
                            color:'red'
                            }}>
                <span className='logo'>olea</span>
                <hr />

                <div id='menu-top-flexbox' style={{display:'flex',height:'11in'}}>
                    <div id='menu-top-left' style={{width:'50%'}}>
                        meats<br/>appetizers    
                    </div>{/* #menu-top-left */}
                    <div id='menu-top-right' style={{width:'50%'}}>
                        entrées<br/>
                        tasting menu
                    </div>{/* #menu-top-right */}
                </div>{/* #menu-top-flexbox */}
                
                sides
                <div id='menu-sides-flexbox' style={{border:'1px solid black'}}>
                    sides
                </div>{/* #menu-sides-flexbox */}
            
                <hr style={{margin:'20px 0'}} />

                <div id='print-menu-footer' style={{display:'flex',justifyContent:'space-between'}}>
                    <span className='chef'>manuel romero, chef</span>
                    <span><img src='./qrCode.jpg' width='65px' /></span>
                    <span style={{width:'55%',fontSize:'10px'}}>
                        consumer advisory: consumption of undercooked meat, poultry, eggs, or seafood
                        may increase the risk of food-borne illnesses<br/>
                        all menu items are subject to change according to seasonality and availability<br/>
                        <span style={{fontWeight:'900'}}>
                            please alert your server if you have special dietary requirements before ordering:<br/>
                            gl (gluten), d (dairy), n (nuts)
                        </span>
                    </span>
                </div>
            </div>{/* #manager-print-dinner-menu */}
        </>
    )
}