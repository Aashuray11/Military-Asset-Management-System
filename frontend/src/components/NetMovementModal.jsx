import React from 'react'

export default function NetMovementModal({open, onClose, data}){
  if(!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-xl p-6">
        <h3 className="text-lg font-semibold">Net Movement Details</h3>
        <div className="mt-4 grid grid-cols-1 gap-2">
          <div>Purchases: {data?.purchases || 0}</div>
          <div>Transfers In: {data?.transfersIn || 0}</div>
          <div>Transfers Out: {data?.transfersOut || 0}</div>
        </div>
        <div className="mt-6 text-right">
          <button onClick={onClose} className="px-4 py-2 bg-slate-500 text-white rounded">Close</button>
        </div>
      </div>
    </div>
  )
}
