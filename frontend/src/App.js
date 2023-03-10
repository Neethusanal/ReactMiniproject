import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/register'  element={<Register/>}>
  
        </Route>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/' element={<Home/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}
