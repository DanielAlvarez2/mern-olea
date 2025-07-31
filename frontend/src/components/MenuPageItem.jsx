import './MenuPageItem.css'

export default function MenuPageItem(props){
    return(
        <>
            <div className='menu-page-item'>
                <div className='name'>{props.data.name}</div>
                <span className='pre-description'>{props.data.preDescription}; </span>
                <span className='description'>{props.data.description}</span>
                <span className='price'>&nbsp;&nbsp;&nbsp;{props.data.price}</span>
            </div>{/* .menu-page-item */}
        </>
    )
}