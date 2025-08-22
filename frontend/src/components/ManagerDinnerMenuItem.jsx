export default function ManagerDinnerMenuItem(props){
    return(
        <div>
            <div style={{display:'flex',flexWrap:'wrap',alignItems:'center'}}>
                <span className='name'>{props.data.name}&nbsp;</span>
                
                {props.data.allergies &&    <>
                                                <span className='allergies'>({props.data.allergies})</span>
                                            </>}
            </div>
            
            {props.data.preDescription &&   <>
                                                <span className='pre-description'>{props.data.preDescription};&nbsp;</span>
                                            </>}
            {props.data.description &&  <>
                                            <span className="description">{props.data.description}</span>
                                        </>}
            <span className="price">&nbsp;&nbsp;{props.data.price}</span>
            <br/><br/><br/>
        </div>
        
    )
}