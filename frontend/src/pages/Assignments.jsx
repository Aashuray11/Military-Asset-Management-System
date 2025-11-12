import React, { useState, useEffect, useContext } from 'react'
import api from '../services/api'
import { AuthContext } from '../context/AuthContext'

export default function Assignments(){
  const [items, setItems] = useState([])
  const [assetId, setAssetId] = useState('')
  const [assignedTo, setAssignedTo] = useState('Unit 1')

  const load = async ()=>{
    try{
      const res = await api.get('/assignments')
      const data = res.data
      setItems(Array.isArray(data) ? data : [])
    }catch(e){ setItems([]) }
  }

  const { user } = useContext(AuthContext)

  useEffect(()=>{ load() }, [])

  const submit = async (e)=>{
    e.preventDefault()
    try{
      await api.post('/assignments', { asset: assetId, assignedTo })
      setAssetId('')
      await load()
      alert('Assignment recorded (simulated)')
    }catch(err){ alert('Failed to record assignment') }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {user && (user.role === 'admin' || user.role === 'commander') ? (
          <form onSubmit={submit} className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Assign Asset</h3>
          <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Asset ID or name" value={assetId} onChange={e=>setAssetId(e.target.value)} />
          <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Assigned to (unit/person)" value={assignedTo} onChange={e=>setAssignedTo(e.target.value)} />
          <div className="text-right">
            <button className="bg-sky-600 text-white px-4 py-2 rounded">Assign</button>
          </div>
          </form>
        ) : (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-3">Assign Asset</h3>
            <div className="text-sm text-slate-500">You do not have permission to assign assets.</div>
          </div>
        )}

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Assignment History</h3>
          {items.length === 0 ? (
            <div className="text-sm text-slate-500">No assignment records (or backend offline)</div>
          ) : (
            <ul className="space-y-2">
              {items.map(a=> (
                <li key={a._id || a.assignedAt} className="border rounded p-2">
                  <div className="font-medium">{a.asset?.name || a.asset || 'Asset'}</div>
                  <div className="text-sm text-slate-500">Assigned to {a.assignedTo}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
