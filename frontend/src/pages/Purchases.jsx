import React, { useState, useEffect, useContext } from 'react'
import api from '../services/api'
import { AuthContext } from '../context/AuthContext'

export default function Purchases(){
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [type, setType] = useState('vehicle')
  const [quantity, setQuantity] = useState(1)
  const [base, setBase] = useState('Base A')

  const { user } = useContext(AuthContext)

  const load = async ()=>{
    try{
      const res = await api.get('/assets')
      const data = res.data
      setItems(Array.isArray(data) ? data : [])
    }catch(e){
      // fallback: empty
      setItems([])
    }
  }

  useEffect(()=>{ load() }, [])

  const submit = async (e)=>{
    e.preventDefault()
    try{
      await api.post('/assets', { name, type, quantity, base })
      setName('')
      setQuantity(1)
      await load()
      alert('Purchase recorded (or simulated)')
    }catch(err){
      alert('Failed to record purchase; backend may be offline')
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Purchases</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {user && (user.role === 'admin' || user.role === 'logistics') ? (
          <form onSubmit={submit} className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Record Purchase</h3>
          <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <select className="w-full border rounded px-2 py-2 mb-2" value={type} onChange={e=>setType(e.target.value)}>
            <option value="vehicle">Vehicle</option>
            <option value="weapon">Weapon</option>
            <option value="ammo">Ammunition</option>
          </select>
          <input type="number" min={1} className="w-full border rounded px-3 py-2 mb-2" value={quantity} onChange={e=>setQuantity(Number(e.target.value))} />
          <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Base" value={base} onChange={e=>setBase(e.target.value)} />
          <div className="text-right">
            <button className="bg-sky-600 text-white px-4 py-2 rounded">Save</button>
          </div>
          </form>
        ) : (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-3">Record Purchase</h3>
            <div className="text-sm text-slate-500">You do not have permission to create purchases.</div>
          </div>
        )}

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Purchase History</h3>
          {items.length === 0 ? (
            <div className="text-sm text-slate-500">No purchase records (or backend offline)</div>
          ) : (
            <ul className="space-y-2">
              {items.map(it=> (
                <li key={it._id || it.name} className="border rounded p-2 flex justify-between">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-slate-500">{it.type} • {it.base}</div>
                  </div>
                  <div className="text-lg font-semibold">{it.quantity}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
