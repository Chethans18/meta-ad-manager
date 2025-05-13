'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // to handle initial state
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        fetchUserData(token); // fetch user data from backend if token exists
      } else {
        setLoading(false); // no token, no need to fetch user
      }
    }
  }, []);

  // fetching user data using the token
  const fetchUserData = async (token) => {
    try {
      console.log("Fetching user data with token:", token); // Debug log
      const res = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User data received:", res.data); // Debug log
      setUser(res.data.user);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = (userData, token) => {
    console.log("Login called with:", { userData, token }); // Debug log
    if (!token) {
      console.error("No token provided during login");
      return;
    }
    setUser(userData);
    localStorage.setItem('token', token);
    router.push('/');
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    router.push('/auth/signin');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
