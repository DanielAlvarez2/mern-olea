import { useState, useEffect } from 'react'

export default function Menu() {
  const BASE_URL =  (process.env.NODE_ENV == 'production') ?
                    'https://mern-olea.onrender.com' : 
                    'http://localhost:1435'
  const [dinnerItems, setDinnerItems] = useState([])
  
  const getDinnerItems = ()=>{
    fetch(`${BASE_URL}/api/dinner`)
      .then(res=>res.json())
      .then(json=>setDinnerItems(json))
      .catch(err=>console.log(err))
  }

  useEffect(()=>getDinnerItems(),[])

  return (
    <>
        <h1>Menu Page</h1>
      {dinnerItems.map(data=>{
        return(
          <div>
            {data.name}
          </div>
        )
      })}
    </>
  )
}
