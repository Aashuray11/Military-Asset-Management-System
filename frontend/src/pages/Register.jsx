import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('logistics')
  const [base, setBase] = useState('')
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async (e)=>{
    e.preventDefault()
    try{
      await register({ name, email, password, role, base })
      navigate('/dashboard')
    }catch(err){
      alert(err?.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create an account</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />

        <label className="block text-sm text-slate-600">Role</label>
        <select className="w-full border rounded px-2 py-1" value={role} onChange={e=>setRole(e.target.value)}>
          <option value="admin">Admin — full access</option>
          <option value="commander">Base Commander — base-only access</option>
          <option value="logistics">Logistics Officer — purchases & transfers</option>
        </select>

        <input className="w-full border rounded px-3 py-2" placeholder="Base (e.g. Base A)" value={base} onChange={e=>setBase(e.target.value)} />

        <div className="flex justify-end">
          <button className="bg-sky-600 text-white px-4 py-2 rounded">Sign up</button>
        </div>
      </form>
    </div>
  )
}
