import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { tokenStorage } from '@/services/api';
import { authService } from '@/services/auth.service';
import type {
  AuthUser, Role, StudentProfile, ParentProfile,
  StudentPermissions, ParentPermissions, LoginRequest,
} from '@/types';

interface AuthState {
  user: AuthUser | null;
  role: Role | null;
  studentProfile: StudentProfile | null;
  parentProfile: ParentProfile | null;
  permissions: StudentPermissions | ParentPermissions | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  loginStudent: (data: LoginRequest) => Promise<void>;
  loginParent: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    role: null,
    studentProfile: null,
    parentProfile: null,
    permissions: null,
    isLoading: true,
  });

  useEffect(() => {
    tokenStorage.get().then((token) => {
      if (!token) setState((s) => ({ ...s, isLoading: false }));
      // token exists but we don't persist user data — redirect to login
      else setState((s) => ({ ...s, isLoading: false }));
    });
  }, []);

  const loginStudent = async (data: LoginRequest) => {
    const res = await authService.loginStudent(data);
    await tokenStorage.set(res.accessToken);
    setState({
      user: res.user,
      role: 'STUDENT',
      studentProfile: res.studentProfile,
      parentProfile: null,
      permissions: res.permissions,
      isLoading: false,
    });
  };

  const loginParent = async (data: LoginRequest) => {
    const res = await authService.loginParent(data);
    await tokenStorage.set(res.accessToken);
    setState({
      user: res.user,
      role: 'PARENT',
      studentProfile: null,
      parentProfile: res.parentProfile,
      permissions: res.permissions,
      isLoading: false,
    });
  };

  const logout = async () => {
    await tokenStorage.remove();
    setState({
      user: null, role: null,
      studentProfile: null, parentProfile: null,
      permissions: null, isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, loginStudent, loginParent, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
