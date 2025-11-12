import React from 'react'

export default function MetricCard({title, value, delta}){
  return (
    <div className="bg-white shadow-sm rounded p-4">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-800">{value}</div>
      {delta !== undefined && (
        <div className="text-sm text-slate-500 mt-1">{delta}</div>
      )}
    </div>
  )
}
