import './MenuPageItem.css'

export default function MenuPageItem(props){
    function openPic(id){
        document.querySelectorAll('.menu-page-pic').forEach(item=>item.style.display = 'none')
        document.querySelector(`#${id}`).style.display = 'block'
    }
    return(
        <>
            <div className='menu-page-item' onClick={()=>openPic(props.data.cloudinary_public_id)}>
                <img    src={props.data.cloudinary_url}
                        className='menu-page-pic' 
                        id={props.data.cloudinary_public_id}
                        style={{maxWidth:'300px',maxHeight:'300px',display:'none'}} />

                {props.data.name == 'jamón ibérico' ? 
                <>
                    <div style={{display:'flex',alignItems:'center',gap:'15px'}}>
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