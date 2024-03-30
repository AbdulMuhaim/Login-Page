import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { useState } from 'react'

function App() {

  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const verified=localStorage.getItem("login")

  const handleLogin=()=>{
    if(localStorage.getItem("login")){
     setIsAuthenticated(true)
    }
  }

  console.log(isAuthenticated,"<==========")

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={isAuthenticated || verified && <Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App

