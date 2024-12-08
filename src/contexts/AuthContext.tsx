// contexts/AuthContext.ts
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';


interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (token: string, email: string, expiration: string) => void;
  logout: () => void;
  token: string | null;
  tokenExpiration: string | null;
  userAuthorities?: {
    Sys: string;
    Audit: string;
    KPI: string;
    Org: string;
  };
}
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function AuthProviderContent({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [tokenExpiration, setTokenExpiration] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // 初始化時檢查認證狀態
  useEffect(() => {
    const initAuth = () => {
      const storedToken = localStorage.getItem('authToken');
      const storedEmail = localStorage.getItem('userEmail');
      const storedExpiration = localStorage.getItem('tokenExpiration');

      if (storedToken && storedEmail && storedExpiration) {
        const expirationDate = new Date(storedExpiration);
        if (expirationDate > new Date()) {
          setToken(storedToken);
          setUserEmail(storedEmail);
          setTokenExpiration(storedExpiration);
          setIsAuthenticated(true);
        } else {
          // Token 過期，清除所有認證信息
          clearAuthData();
        }
      }
    };

    // 確保只在客戶端執行
    if (typeof window !== 'undefined') {
      initAuth();
    }
  }, []);

  const clearAuthData = () => {
    setToken(null);
    setUserEmail(null);
    setTokenExpiration(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('tokenExpiration');
  };

  const login = (newToken: string, email: string, expiration: string) => {
    setToken(newToken);
    setUserEmail(email);
    setTokenExpiration(expiration);
    setIsAuthenticated(true);

    localStorage.setItem('authToken', newToken);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('tokenExpiration', expiration);

    console.log('Login successful:', { newToken, email, expiration }); // 調試用
  };

  const logout = () => {
    clearAuthData();
    router.push('/login');
    console.log('Logout successful'); // 調試用
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    token,
    userEmail,
    tokenExpiration
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthProviderContent>{children}</AuthProviderContent>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
