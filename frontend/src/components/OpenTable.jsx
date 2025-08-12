import './OpenTable.css'

export default function OpenTable(){
    return (
        <>
                <div className='open-table'>
                  <div id='ot1'>make a reservation</div>
                  <div id='ot2'>POWERED BY OPENTABLE</div><br/>
                  <a  href='https://www.opentable.com/rest_profile.aspx?rid=151186&restref=151186'
                      target='_blank'>
                    <span id='ot3' style={{cursor:'pointer'}}>FIND A TABLE</span>
                  </a>
                </div>{/* #open-table */}

        </>
    )
}