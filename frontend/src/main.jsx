import ReactDOM from 'react-dom/client'
import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Admin from './Admin.jsx'
import Menu from './Menu.jsx'
import Index from './Index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='admin' element={<Admin />} />
        <Route path='menu' element={<Menu />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
