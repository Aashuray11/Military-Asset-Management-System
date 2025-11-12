import React from 'react'

export default function FilterBar({filters, onChange, onApply}){
  return (
    <div className="bg-white p-4 rounded shadow-sm flex gap-3 flex-wrap">
      <select className="border rounded px-2 py-1" name="base" value={filters.base||''} onChange={onChange}>
        <option value="">All bases</option>
        <option value="Base A">Base A</option>
        <option value="Base B">Base B</option>
      </select>
      <select className="border rounded px-2 py-1" name="type" value={filters.type||''} onChange={onChange}>
        <option value="">All types</option>
        <option value="vehicle">Vehicle</option>
        <option value="weapon">Weapon</option>
        <option value="ammo">Ammunition</option>
      </select>
      <input type="date" name="date" value={filters.date||''} onChange={onChange} className="border rounded px-2 py-1" />
      <button onClick={onApply} className="bg-sky-600 text-white px-3 py-1 rounded">Apply</button>
    </div>
  )
}
