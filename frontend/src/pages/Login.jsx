import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async (e)=>{
    e.preventDefault()
    try{
      await login(email, password)
      navigate('/dashboard')
    }catch(err){
      alert('Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign in</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="flex justify-end">
          <button className="bg-sky-600 text-white px-4 py-2 rounded">Login</button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        <span>Don't have an account? </span>
        <a href="/register" className="text-sky-600 underline">Sign up</a>
      </div>
    </div>
  )
}
