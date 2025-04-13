import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import MainLayout from './layouts/MainLayout'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      {isLoggedIn ? (
        <MainLayout onLogout={() => setIsLoggedIn(false)}>
          <Dashboard />
        </MainLayout>
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  )
}

export default App
