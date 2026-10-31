import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, UserResponse } from '../services/authService';

interface AuthState {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ mfaRequired?: boolean; mfaToken?: string }>;
  verifyMfa: (mfaToken: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (req: { email: string; password: string; role: string; firstName?: string; lastName?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser]         = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const stored = authService.getStoredUser();
      if (stored && authService.isAuthenticated()) {
        setUser(stored);
        try {
          const fresh = await authService.me();
          setUser(fresh);
          localStorage.setItem('user', JSON.stringify(fresh));
        } catch {
          await authService.logout();
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    init();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authService.login({ email, password });
    if (res.mfaRequired) return { mfaRequired: true, mfaToken: res.mfaToken };
    if (res.user) setUser(res.user);
    return {};
  }, []);

  const verifyMfa = useCallback(async (mfaToken: string, code: string) => {
    const res = await authService.verifyMfa({ mfaToken, code });
    if (res.user) setUser(res.user);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const register = useCallback(async (req: { email: string; password: string; role: string; firstName?: string; lastName?: string }) => {
    await authService.register(req);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, verifyMfa, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
