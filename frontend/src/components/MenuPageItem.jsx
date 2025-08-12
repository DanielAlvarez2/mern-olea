import './MenuPageItem.css'

export default function MenuPageItem(props){
    function openPic(id){
        document.querySelectorAll('.menu-page-pic').forEach(item=>item.style.display = 'none')
        document.querySelector(`#${id}`).style.display = 'block'
    }
    return(
        <>
            <div    className='menu-page-item'
                    onClick={()=>{
                                    document.querySelector('#menu-page-content').style.height = '100vh'
                                    document.querySelector('#menu-page-content').style.overflow = 'hidden'
                                    document.querySelector(`#pic-${props.data._id}`).style.display = 'grid'
                                    document.querySelector(`#footer-content`).style.display = 'none'
                            }}
                    style={{marginBottom: 
                        ((props.data.section == 'Sides' && props.data.sequence == 1) ||
                        (props.data.section == 'Sides' && props.data.sequence == 2)) ? 0 : ''
                    }}> 

                {props.data.name == 'jamón ibérico' ? 
                <>
                    <div    id='menu-page-jamon-iberico' 
                            style={{display:'flex',
                                    alignItems:'center',
                                    gap:'15px',
                                    flexWrap:'wrap'}}>
                        <span className='name'>{props.data.name}</span>
                        <span className='price'>{props.data.price}</span>
                    </div>
                </> 
                :
                <>
                    <div className='name'>{props.data.name}</div>
                    {props.data.preDescription && <span className='pre-description'>{props.data.preDescription}; </span>}
                    <span className='description'>{props.data.description}</span>
                    <span className='price'>&nbsp;&nbsp;&nbsp;{props.data.price}</span>
                </>
                }

                {props.data.name == 'cochinillo' && 
                    <div style={{fontStyle:'italic'}}>(please allow 40 minutes cooking time)</div>}                
            </div>{/* .menu-page-item */}
        </>
    )
}