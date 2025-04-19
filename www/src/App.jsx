import { useState, useEffect } from 'react'
import './App.css'
import LoginPage from './features/auth/pages/LoginPage'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import MainLayout from './layouts/MainLayout'
import * as authService from './features/auth/services/authService'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState(null)

  // Check if user is already logged in on component mount
  useEffect(() => {
    if (authService.isTokenValid()) {
      const storedProfile = authService.getStoredProfile()
      if (storedProfile) {
        setUserProfile(storedProfile)
        setIsLoggedIn(true)
      }
    }
  }, [])

  const handleLoginSuccess = (profile) => {
    setUserProfile(profile)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    authService.logout()
    setUserProfile(null)
    setIsLoggedIn(false)
  }

  return (
    <>
      {isLoggedIn ? (
        <MainLayout onLogout={handleLogout} userProfile={userProfile}>
          <DashboardPage />
        </MainLayout>
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  )
}

export default App
