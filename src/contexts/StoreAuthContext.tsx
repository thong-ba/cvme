import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AUTH_STORAGE_KEY = 'ecommerce_auth_user';
const REMEMBER_KEY = 'ecommerce_auth_remember';

export interface StoreUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface StoreAuthContextValue {
  user: StoreUser | null;
  isLoaded: boolean;
  login: (identifier: string, password: string, remember?: boolean) => Promise<{ success: boolean; message?: string }>;
  register: (payload: { name: string; email: string; phone: string; password: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const StoreAuthContext = createContext<StoreAuthContextValue | null>(null);

function loadUserFromStorage(): StoreUser | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoreUser;
  } catch {
    return null;
  }
}

/** Demo: danh sách user "ảo" đã đăng ký (chỉ dùng khi chưa có backend) */
function getDemoRegisteredUsers(): Record<string, { password: string; user: StoreUser }> {
  try {
    const raw = localStorage.getItem('ecommerce_demo_users');
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function setDemoRegisteredUser(email: string, data: { password: string; user: StoreUser }) {
  const users = getDemoRegisteredUsers();
  users[email.toLowerCase()] = data;
  localStorage.setItem('ecommerce_demo_users', JSON.stringify(users));
}

export function StoreAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoreUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const remembered = localStorage.getItem(REMEMBER_KEY);
    if (remembered === 'true') {
      setUser(loadUserFromStorage());
    }
    setIsLoaded(true);
  }, []);

  const login = useCallback(
    async (
      identifier: string,
      password: string,
      remember?: boolean
    ): Promise<{ success: boolean; message?: string }> => {
      const key = identifier.trim().toLowerCase();
      const demoUsers = getDemoRegisteredUsers();
      const byEmail = Object.entries(demoUsers).find(
        ([email]) => email === key || demoUsers[email].user.phone === identifier.trim()
      );
      const found = byEmail ? demoUsers[byEmail[0]] : null;

      if (found && found.password === password) {
        setUser(found.user);
        if (remember) {
          localStorage.setItem(REMEMBER_KEY, 'true');
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(found.user));
        } else {
          localStorage.removeItem(REMEMBER_KEY);
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
        return { success: true };
      }

      if (identifier === 'demo@shop.demo' && password === '123456') {
        const demoUser: StoreUser = {
          id: 'demo',
          name: 'Khách demo',
          email: 'demo@shop.demo',
          phone: '0900000000',
        };
        setUser(demoUser);
        if (remember) {
          localStorage.setItem(REMEMBER_KEY, 'true');
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser));
        }
        return { success: true };
      }

      return { success: false, message: 'Email/SĐT hoặc mật khẩu không đúng.' };
    },
    []
  );

  const register = useCallback(
    async (payload: {
      name: string;
      email: string;
      phone: string;
      password: string;
    }): Promise<{ success: boolean; message?: string }> => {
      const emailKey = payload.email.trim().toLowerCase();
      const demoUsers = getDemoRegisteredUsers();
      if (demoUsers[emailKey]) {
        return { success: false, message: 'Email này đã được đăng ký.' };
      }
      const phoneExists = Object.values(demoUsers).some((u) => u.user.phone === payload.phone.trim());
      if (phoneExists) {
        return { success: false, message: 'Số điện thoại này đã được đăng ký.' };
      }

      const newUser: StoreUser = {
        id: `user_${Date.now()}`,
        name: payload.name.trim(),
        email: payload.email.trim(),
        phone: payload.phone.trim(),
      };
      setDemoRegisteredUser(emailKey, { password: payload.password, user: newUser });
      setUser(newUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      localStorage.setItem(REMEMBER_KEY, 'true');
      return { success: true };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  }, []);

  const value: StoreAuthContextValue = {
    user,
    isLoaded,
    login,
    register,
    logout,
  };

  return (
    <StoreAuthContext.Provider value={value}>
      {children}
    </StoreAuthContext.Provider>
  );
}

export function useStoreAuth() {
  const ctx = useContext(StoreAuthContext);
  if (!ctx) throw new Error('useStoreAuth must be used within StoreAuthProvider');
  return ctx;
}
