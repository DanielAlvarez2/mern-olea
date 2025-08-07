export default function HomePageMenuItem(props){
    return(
        <>
            <div style={{marginTop:'20px',display:'flex',justifyContent:'space-between'}}>
                <span className='name'>{props.data.name}</span>
                <span className='price'>{props.data.price}</span>
            </div>
            <div style={{width:'calc(100% - 4ch)'}}>
                {props.data.preDescription && <span className='pre-description'>{props.data.preDescription};&nbsp;</span>}  
                <span className='description'>{props.data.description}</span>
            </div>            
        </>
    )
}