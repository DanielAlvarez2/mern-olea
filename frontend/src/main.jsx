import ReactDOM from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router'
import { StrictMode } from 'react'
import Admin from './Admin.jsx'
import Menu from './Menu.jsx'
import Root from './Root.jsx'
import Pics from './Pics.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />} />
        <Route path='admin' element={<Admin />} />
        <Route path='menu' element={<Menu />} />
        <Route path='pics' element={<Pics />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
