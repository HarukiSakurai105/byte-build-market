
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getConnectionConfig, SqlServerConfig } from '@/services/databaseService';

type Theme = 'light' | 'dark';

interface AdminContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  dbConfig: SqlServerConfig | null;
  isDbConnected: boolean;
  setDbConnected: (status: boolean) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  adminProfile: {
    name: string;
    email: string;
    avatar: string;
  };
  updateProfile: (profile: Partial<AdminContextType['adminProfile']>) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [dbConfig, setDbConfig] = useState<SqlServerConfig | null>(null);
  const [isDbConnected, setIsDbConnected] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin',
    email: 'admin@techstore.com',
    avatar: '/placeholder.svg',
  });

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }

    // Load theme preference
    const savedTheme = localStorage.getItem('adminTheme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Load admin profile if exists
    const savedProfile = localStorage.getItem('adminProfile');
    if (savedProfile) {
      setAdminProfile(JSON.parse(savedProfile));
    }

    // Load database configuration
    const config = getConnectionConfig();
    setDbConfig(config);
    setIsDbConnected(!!config);
  }, []);

  // Effect to save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('adminTheme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

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

  const updateProfile = (profile: Partial<AdminContextType['adminProfile']>) => {
    setAdminProfile(prev => {
      const newProfile = { ...prev, ...profile };
      localStorage.setItem('adminProfile', JSON.stringify(newProfile));
      return newProfile;
    });
  };

  const setDbConnected = (status: boolean) => {
    setIsDbConnected(status);
  };

  return (
    <AdminContext.Provider value={{ 
      isAdmin, 
      login, 
      logout, 
      dbConfig, 
      isDbConnected, 
      setDbConnected, 
      theme, 
      setTheme,
      adminProfile,
      updateProfile
    }}>
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
