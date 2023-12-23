import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import Login from './Login'
import Cabinet from './Cabinet'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("token")
      navigate('/login')
    }, 60000);
    }, [location.pathname]);    

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Cabinet/>}/>
      </Routes>
    </>
  )
}

export default App
