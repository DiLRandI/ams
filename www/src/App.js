import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createContext, useState, useContext } from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import LoginComponent from './components/auth/LoginComponent';
// Create authentication context
export const AuthContext = createContext(null);

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    let token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginComponent setIsAuthenticated={setIsAuthenticated} />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
