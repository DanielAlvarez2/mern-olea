export default function ManagerDinnerMenuItem(props){
    return(
        <div>
            <span className='name'>{props.data.name}</span>
            {props.data.allergies &&    <>
                                            <span className='allergies'>&nbsp;({props.data.allergies})</span>
                                        </>}<br/>
            {props.data.preDescription &&   <>
                                                <span className='pre-description'>{props.data.preDescription};</span>
                                            </>}
            {props.data.description &&  <>
                                            <span className="description">{props.data.description}</span>
                                        </>}
            <span className="price">&nbsp;&nbsp;{props.data.price}</span>
        </div>
    )
}