import { useState, useEffect } from 'react'

export default function App() {
  const [dinnerItems, setDinnerItems] = useState([])
  
  const getDinnerItems = ()=>{
    fetch('/api/dinner')
      .then(res=>res.json())
      .then(json=>setDinnerItems(json))
      .catch(err=>console.log(err))
  }

  useEffect(()=>getDinnerItems(),[])

  return (
    <>
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
