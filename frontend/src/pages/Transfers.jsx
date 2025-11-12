import React, { useState, useEffect, useContext } from 'react'
import api from '../services/api'
import { AuthContext } from '../context/AuthContext'

export default function Transfers(){
  const [items, setItems] = useState([])
  const [assetId, setAssetId] = useState('')
  const [fromBase, setFromBase] = useState('Base A')
  const [toBase, setToBase] = useState('Base B')
  const [quantity, setQuantity] = useState(1)

  const load = async ()=>{
    try{
      const res = await api.get('/transfers')
      const data = res.data
      setItems(Array.isArray(data) ? data : [])
    }catch(e){ setItems([]) }
  }

  const { user } = useContext(AuthContext)

  useEffect(()=>{ load() }, [])

  const submit = async (e)=>{
    e.preventDefault()
    try{
      await api.post('/transfers', { asset: assetId, fromBase, toBase, quantity })
      setAssetId('')
      await load()
      alert('Transfer recorded (simulated)')
    }catch(err){ alert('Failed to record transfer') }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Transfers</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {user && (user.role === 'admin' || user.role === 'logistics') ? (
          <form onSubmit={submit} className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Record Transfer</h3>
          <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Asset ID or name" value={assetId} onChange={e=>setAssetId(e.target.value)} />
          <input className="w-full border rounded px-3 py-2 mb-2" placeholder="From base" value={fromBase} onChange={e=>setFromBase(e.target.value)} />
          <input className="w-full border rounded px-3 py-2 mb-2" placeholder="To base" value={toBase} onChange={e=>setToBase(e.target.value)} />
          <input type="number" min={1} className="w-full border rounded px-3 py-2 mb-2" value={quantity} onChange={e=>setQuantity(Number(e.target.value))} />
          <div className="text-right">
            <button className="bg-sky-600 text-white px-4 py-2 rounded">Record</button>
          </div>
          </form>
        ) : (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-3">Record Transfer</h3>
            <div className="text-sm text-slate-500">You do not have permission to record transfers.</div>
          </div>
        )}

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Transfer History</h3>
          {items.length === 0 ? (
            <div className="text-sm text-slate-500">No transfer records (or backend offline)</div>
          ) : (
            <ul className="space-y-2">
              {items.map(t=> (
                <li key={t._id || t.executedAt} className="border rounded p-2">
                  <div className="font-medium">{t.asset?.name || t.asset || 'Asset'}</div>
                  <div className="text-sm text-slate-500">{t.fromBase} → {t.toBase} • {t.quantity}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
