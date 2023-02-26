import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './routes/login'
import Logout from './routes/Logout'
import Register from './routes/Register'
import CreateThread from './routes/CreateThread'
import PrivateRoute from './routes/PrivateRoute'
import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Forums from './routes/Forums'
import ThreadView from './routes/ThreadView'
import CreateReply from './routes/CreateReply'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/forums" element={<Forums/>} />
      <Route path="/forums/create" element={<CreateThread/>} />
      <Route path="/forums/:id" element={<ThreadView/>} />
      <Route path="/forums/:id/create" element={<CreateReply/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/logout' element={<Logout />} />
      <Route path ='/private' element={<PrivateRoute/>}/>
    </Routes>
  )
}

export default App
