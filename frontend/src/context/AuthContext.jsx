import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

function decodeToken(token){
  try{
    const parts = token.split('.')
    if(parts.length !== 3) return null
    const payload = parts[1]
    // base64url decode
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json)
  }catch(e){ return null }
}

export function AuthProvider({children}){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      const p = decodeToken(token)
      if(p){
        setUser({ id: p.id, role: p.role, base: p.base, authenticated: true })
      }else{
        setUser({ authenticated: true })
      }
    }
  },[])

  const login = async (email, password) => {
    const res = await api.post('/users/login', { email, password })
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user || { authenticated: true })
  }

  const register = async (payload) => {
    const res = await api.post('/users/register', payload)
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user || { authenticated: true })
  }

  const logout = ()=>{
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
