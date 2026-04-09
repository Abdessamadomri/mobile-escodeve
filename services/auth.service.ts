import { api } from './api';
import type { LoginRequest, StudentLoginResponse, ParentLoginResponse } from '@/types';

export const authService = {
  loginStudent: (data: LoginRequest) =>
    api.post<StudentLoginResponse>('/api/student/login', data),

  loginParent: (data: LoginRequest) =>
    api.post<ParentLoginResponse>('/api/parent/login', data),
};
