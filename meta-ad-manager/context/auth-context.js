'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        // Set the token in api defaults
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        fetchUserData(token);
      } else {
        setLoading(false);
      }
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      console.log("Fetching user data with token:", token);
      const res = await api.get('/auth/me');
      console.log("User data received:", res.data);
      setUser(res.data.user || res.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setUser(null);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, token) => {
    console.log("Login called with:", { userData, token });
    if (!token) {
      console.error("No token provided during login");
      return;
    }
    setUser(userData);
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    router.push('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    router.push('/auth/signin');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
