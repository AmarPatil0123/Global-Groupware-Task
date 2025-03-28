import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App