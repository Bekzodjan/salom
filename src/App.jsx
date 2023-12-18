import { useEffect, useState } from 'react'
import call from './utils/request'
import {Link,useNavigate,Route,Routes} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Home from './Home'
import Posts from './Posts'
import Todos from './Todos'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/todos' element={<Todos/>}/>
      </Routes>

    </>
  )
}

export default App
