import { AiTwotoneCloseCircle } from "react-icons/ai"

export default function MenuPagePic(props){
    return(
        <>
            <div    style={{position:'absolute',
                            top:'0',
                            left:'0',
                            width:'100vw',
                            height:'100vh',
                            display:'none',
                            background:'lightgrey',
                            placeContent:'center',
                            border:'1px solid green'}}
                    id={'pic-'+ props.data._id} 
                    className='menu-page-pic'>
                <figure style={{display:'table',position:'relative'}}>
                    <AiTwotoneCloseCircle   size='40'
                                            onClick={()=>{
                                                document.querySelector('#menu-page-content').style.height = 'auto'
                                                document.querySelector('#menu-page-content').style.overflow = 'visible'
                                                document.querySelector(`#pic-${props.data._id}`).style.display = 'none'
                                                document.querySelector(`#footer-content`).style.display = 'block'
                                            }} 
                                            style={{position:'absolute',
                                                    cursor:'pointer',
                                                    top:'0',
                                                    right:'0'}} />
                    <img style={{maxWidth:'75vw',maxHeight:'75vh'}} src={props.data.cloudinary_url} />
                    <figcaption style={{display:'table-caption',captionSide:'bottom'}}>
                        {props.data.name == 'jamón ibérico' ? 
                        <>
                            <span className='name'>{props.data.name}</span>&nbsp;&nbsp;&nbsp;
                            <span className='price'>{props.data.price}</span>
                        </> 
                        : 
                        <>
                            <div className="name">{props.data.name}</div>
                            {props.data.preDescription && <span className='pre-description'>{props.data.preDescription}; </span>}
                            <span className='description'>{props.data.description}</span>&nbsp;&nbsp;&nbsp;
                            <span className='price'>{props.data.price}</span>
                            {props.data.name == 'cochinillo' && 
                                <div style={{fontStyle:'italic'}}>(please allow 40 minutes cooking time)</div>}
                        </>}
                    </figcaption>
                </figure>
            </div>
        </>
    )
}