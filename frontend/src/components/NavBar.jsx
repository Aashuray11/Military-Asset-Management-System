import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function NavBar(){
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)
  const [open, setOpen] = useState(false)

  const onLogout = ()=>{
    logout()
    navigate('/login')
    setOpen(false)
  }

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="font-bold text-xl text-slate-700">MAMS</div>
          <nav className="hidden md:flex gap-4 text-slate-600 ml-4">
            <Link to="/dashboard" className="hover:text-slate-900">Dashboard</Link>
            <Link to="/purchases" className="hover:text-slate-900">Purchases</Link>
            <Link to="/transfers" className="hover:text-slate-900">Transfers</Link>
            <Link to="/assignments" className="hover:text-slate-900">Assignments</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login" className="text-slate-700 px-3 py-1 border rounded">Login</Link>
              <Link to="/register" className="text-white bg-sky-600 px-3 py-1 rounded">Sign up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="text-slate-700 px-3 py-1 border rounded">Profile</Link>
              <button onClick={onLogout} className="bg-rose-500 text-white px-3 py-1 rounded">Logout</button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button aria-label="Toggle menu" onClick={()=>setOpen(v=>!v)} className="p-2 rounded-md focus:outline-none focus:ring">
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <Link to="/dashboard" onClick={()=>setOpen(false)} className="block text-slate-700">Dashboard</Link>
            <Link to="/purchases" onClick={()=>setOpen(false)} className="block text-slate-700">Purchases</Link>
            <Link to="/transfers" onClick={()=>setOpen(false)} className="block text-slate-700">Transfers</Link>
            <Link to="/assignments" onClick={()=>setOpen(false)} className="block text-slate-700">Assignments</Link>

            <div className="border-t pt-2">
              {!user ? (
                <>
                  <Link to="/login" onClick={()=>setOpen(false)} className="block text-slate-700">Login</Link>
                  <Link to="/register" onClick={()=>setOpen(false)} className="block text-sky-600">Sign up</Link>
                </>
              ) : (
                <>
                  <Link to="/profile" onClick={()=>setOpen(false)} className="block text-slate-700">Profile</Link>
                  <button onClick={onLogout} className="mt-1 block text-left text-rose-600">Logout</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
