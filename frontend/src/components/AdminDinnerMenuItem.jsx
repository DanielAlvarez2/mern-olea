export default function AdminDinnerMenuItem(props){

        function DeleteDinnerMenuItem(id){
            fetch(`${BASE_URL}/api/dinner/id`,{method:'DELETE'})
                .then(res=>res.json(`Item Deleted from Database`))
                .then(()=>getDinnerItems())
                .catch(err=>console.log(err))      
        }

                  return(
                    <div className='menu-item'>
                      {props.data.name == 'jamón ibérico' ? 
                      <>
                        <span className='name'>{props.data.name}</span>&nbsp;&nbsp;
                        <span className='price'>{props.data.price}</span>
                        <br/>{props.data.sequence}
                      </>
                      :  
                      <>
                        <span className='name'>{props.data.name}</span>&nbsp;
                        {props.data.allergies && <span className='allergies'>({props.data.allergies})</span>}<br/>
                        {props.data.preDescription && <span className='pre-description'>{props.data.preDescription}; </span>}
                        <span className='description'>{props.data.description}</span>&nbsp;&nbsp;
                        <span className='price'>{props.data.price}</span>
                        {props.data.name == 'cochinillo' && <><br/><span id='cochinillo'>(please allow 40 minutes cooking time)</span></>}
                        <br/>{props.data.sequence}
                      </>
                      }
                      <div className='menu-item-buttons'>
                        <button onClick={()=>DeleteDinnerMenuItem(props.data._id)} style={{background:'red',color:'white'}}>Delete</button>
                      </div>
                    </div>
                  )


}