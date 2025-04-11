
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getConnectionConfig, SqlServerConfig } from '@/services/databaseService';

interface AdminContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  dbConfig: SqlServerConfig | null;
  isDbConnected: boolean;
  setDbConnected: (status: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [dbConfig, setDbConfig] = useState<SqlServerConfig | null>(null);
  const [isDbConnected, setIsDbConnected] = useState<boolean>(false);

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }

    // Load database configuration
    const config = getConnectionConfig();
    setDbConfig(config);
    setIsDbConnected(!!config);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple admin authentication (replace with real authentication later)
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const setDbConnected = (status: boolean) => {
    setIsDbConnected(status);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, dbConfig, isDbConnected, setDbConnected }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
