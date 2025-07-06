import { createContext, useContext, useEffect, useState } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  // Fetch user profile when token exists
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await API.get('/user/profile', {
          headers: {
            Authorization: token,
          },
        });
        setUser(res.data); // 👈 store full user info
      } catch (err) {
        console.error('Failed to fetch user profile', err);
        logout();
      }
    };

    if (token) {
      fetchUserProfile();
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for components to use
export const useAuth = () => useContext(AuthContext);
