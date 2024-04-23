import { useEffect, useState } from "react"
import userService from "./services/UserService";
import axios from "axios"
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserHomePage from './pages/UserHomePage'
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/userhomepage/:id" exact element={<UserHomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Routes>
        
      </Router>
    </div>
  )
}

export default App