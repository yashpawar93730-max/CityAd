import { createContext, useContext, useState } from 'react';
import { USERS } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('transitads_user');
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem('transitads_user');
      return null;
    }
  });

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    const found = USERS.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === normalizedPassword
    );
    if (found) {
      const userData = { ...found };
      delete userData.password;
      setUser(userData);
      localStorage.setItem('transitads_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (data) => {
    const userData = { id: 'U' + Date.now(), ...data, role: 'advertiser' };
    delete userData.password;
    setUser(userData);
    localStorage.setItem('transitads_user', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('transitads_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
