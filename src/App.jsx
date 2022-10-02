import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export function App() {
  return (
    <>
      <header>
        <Link to="/">
          <h1>Astronomy Picture of the Day</h1>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
