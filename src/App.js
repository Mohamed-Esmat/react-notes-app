import React from 'react'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import {Routes, Route , Navigate} from 'react-router-dom';
import ProtectedRoutes from './components/Protected/ProtectedRoutes'
function App() {
  return (
    <>
      <Navbar/>
      <Routes>

        {/* <Route  element={<ProtectedRoutes><Home/></ProtectedRoutes>} /> */}
        {/* <Route path='/home' element={<Home/>}/> */}
        <Route element={<ProtectedRoutes/>}>
          <Route path='/home' element={<Home/>} exact/>
        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Navigate replace to="/home"/>}/>
        <Route path='*' element={<NotFound/>}/>

        </Routes> 
    </>
  )
}

export default App