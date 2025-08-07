import './PageFooter.css'
export default function PageFooter(props){
    return(
        <>
            <div id='footer-wrapper'>
                <div id='footer-content' className='no-print' style={{color:props.color}}>
                    powered by Toggle Software
                </div>{/* #footer-content */}
            </div>{/* #footer-wrapper */}
        </>
    )
}