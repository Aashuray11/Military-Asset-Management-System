import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Profile(){
  const { user } = useContext(AuthContext)

  // user may be a minimal object; guard against null
  if(!user) return (
    <div className="max-w-3xl mx-auto mt-16 bg-white p-6 rounded shadow">Please login to see profile.</div>
  )

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="space-y-2">
        <div><strong>Name:</strong> {user.name || '—'}</div>
        <div><strong>Email:</strong> {user.email || '—'}</div>
        <div><strong>Role:</strong> {user.role || '—'}</div>
        <div><strong>Base:</strong> {user.base || '—'}</div>
      </div>
    </div>
  )
}
