/**
 * Authentication Service
 * Handles user authentication, including login, token management, and user profile
 */

/**
 * User login function
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Promise resolving to auth data containing tokens and profile info
 */
export const login = async (email, password) => {
  // In a real app, this would be an API call
  // For now, we'll simulate a backend response with a delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'password') {
        // Successful response with tokens and user profile
        resolve({
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJpYXQiOjE2MTYyMzkwMjJ9',
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJyZWZyZXNoIjp0cnVlLCJpYXQiOjE2MTYyMzkwMjJ9',
          ttl: 3600, // Token time-to-live in seconds (1 hour)
          profile: {
            username: 'admin',
            fullName: 'Admin User',
            email: 'admin@example.com',
            profilePicture: '/assets/profile-default.png',
            roles: ['admin'],
          }
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000); // Simulate network delay
  });
};

/**
 * Refresh the authentication token
 * @param {string} refreshToken - Current refresh token
 * @returns {Promise} - Promise resolving to new tokens
 */
export const refreshAuth = async (refreshToken) => {
  // In a real app, this would validate the refresh token with an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (refreshToken) {
        resolve({
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJpYXQiOjE2MTYyMzkwMjJ9.newSignature',
          refreshToken: refreshToken, // Often the refresh token stays the same
          ttl: 3600,
        });
      } else {
        reject(new Error('Invalid refresh token'));
      }
    }, 500);
  });
};

/**
 * Get user profile information
 * @returns {Promise} - Promise resolving to user profile data
 */
export const getProfile = async () => {
  // In a real app, this would be an API call using the auth token
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: 'admin',
        fullName: 'Admin User',
        email: 'admin@example.com',
        profilePicture: '/assets/profile-default.png',
        roles: ['admin'],
      });
    }, 500);
  });
};

/**
 * Store authentication data in local storage
 * @param {Object} authData - Authentication data including tokens and TTL
 */
export const storeAuthData = (authData) => {
  localStorage.setItem('token', authData.token);
  localStorage.setItem('refreshToken', authData.refreshToken);
  localStorage.setItem('tokenExpiry', new Date().getTime() + (authData.ttl * 1000));
  
  // Store minimal profile data
  if (authData.profile) {
    localStorage.setItem('userProfile', JSON.stringify({
      username: authData.profile.username,
      profilePicture: authData.profile.profilePicture
    }));
  }
};

/**
 * Get stored authentication token
 * @returns {string|null} - The stored token or null if not available
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Check if current token is valid
 * @returns {boolean} - Whether token is valid and not expired
 */
export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('tokenExpiry');
  
  if (!token || !expiry) return false;
  
  return new Date().getTime() < parseInt(expiry);
};

/**
 * Clear all authentication data from storage
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('tokenExpiry');
  localStorage.removeItem('userProfile');
};

/**
 * Get stored user profile data
 * @returns {Object|null} - User profile data or null if not logged in
 */
export const getStoredProfile = () => {
  const profileData = localStorage.getItem('userProfile');
  return profileData ? JSON.parse(profileData) : null;
};