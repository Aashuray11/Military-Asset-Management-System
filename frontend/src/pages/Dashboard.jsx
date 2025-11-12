import React, { useState } from 'react'
import MetricCard from '../components/MetricCard'
import FilterBar from '../components/FilterBar'
import NetMovementModal from '../components/NetMovementModal'

export default function Dashboard(){
  const [filters, setFilters] = useState({})
  const [modalOpen, setModalOpen] = useState(false)

  const handleChange = (e)=>{
    setFilters(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const apply = ()=>{
    // fetch data with filters (placeholder)
    setModalOpen(true)
  }

  const mock = {
    opening: 1200,
    closing: 980,
    net: -220,
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <FilterBar filters={filters} onChange={handleChange} onApply={apply} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <MetricCard title="Opening Balance" value={mock.opening} />
        <MetricCard title="Closing Balance" value={mock.closing} />
        <div>
          <MetricCard title="Net Movement" value={mock.net} delta={<button onClick={()=>setModalOpen(true)} className="text-sky-600 underline">Details</button>} />
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Recent Activity</h3>
        <div className="text-sm text-slate-600">(This is mock data — connect to backend to load real records)</div>
      </div>

      <NetMovementModal open={modalOpen} onClose={()=>setModalOpen(false)} data={{purchases: 50, transfersIn: 10, transfersOut: 280}} />
    </div>
  )
}
