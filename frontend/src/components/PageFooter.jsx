import './PageFooter.css'
export default function PageFooter(props){
    return(
        <>
            <div id='footer-wrapper'>
                <div id='footer-content' style={{color:props.color}}>
                    Powered by Toggle Software
                </div>{/* #footer-content */}
            </div>{/* #footer-wrapper */}
        </>
    )
}