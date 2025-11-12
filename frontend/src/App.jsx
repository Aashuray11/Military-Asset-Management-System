import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Purchases from './pages/Purchases'
import Transfers from './pages/Transfers'
import Assignments from './pages/Assignments'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 app-container">
        <NavBar />
        <main className="px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="/purchases" element={<ProtectedRoute><Purchases/></ProtectedRoute>} />
            <Route path="/transfers" element={<ProtectedRoute><Transfers/></ProtectedRoute>} />
            <Route path="/assignments" element={<ProtectedRoute><Assignments/></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

