export default function ManagerDinnerMenuItem(props){
    return(
        <div><br/>
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
            <span id='manager-edit-buttons' style={{  display:'flex',
                            justifyContent:'space-between',
                            maxWidth:'1.5in'}}>
                <button style={{fontSize:'9px',background:'blue',color:'white',margin:'0',padding:'0.5em 0.25em'}}>EDIT</button>
                <button style={{fontSize:'9px',background:'yellow',margin:'0',padding:'0.5em 0.25em'}}>ARCHIVE</button>
                <button style={{fontSize:'9px',background:'red',color:'white',margin:'0',padding:'0.5em 0.25em'}}>DELETE</button>
            </span>
            <br/>
        </div>
        
    )
}