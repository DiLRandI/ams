// Login component
import React, { useState } from 'react';
import { loginApi } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const LoginComponent = ({ setIsAuthenticated }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.target);
    const userName = formData.get('userName');
    const password = formData.get('password');

    try {
      const response = await loginApi(userName, password);
      // Store the token if needed
      if (response.token) {
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div>
          <input type="text" name="userName" placeholder="Username" required />
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;