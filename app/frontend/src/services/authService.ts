import { api } from './api';

export interface LoginRequest  { email: string; password: string; }
export interface MfaVerifyRequest { mfaToken: string; code: string; }
export interface RegisterRequest { email: string; password: string; role: string; firstName?: string; lastName?: string; }

export interface UserResponse {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  role: string;
  mfaActive: boolean;
}

export interface AuthResponse {
  accessToken?: string;
  refreshToken?: string;
  user?: UserResponse;
  mfaRequired?: boolean;
  mfaToken?: string;
}

export interface TokenResponse { accessToken: string; refreshToken: string; }

export const authService = {
  async register(req: RegisterRequest): Promise<{ id: number; email: string; role: string }> {
    return api.post('/auth/register', req);
  },

  async login(req: LoginRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/login', req);
    if (res.accessToken && res.refreshToken) {
      localStorage.setItem('accessToken',  res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      if (res.user) localStorage.setItem('user', JSON.stringify(res.user));
    }
    return res;
  },

  async verifyMfa(req: MfaVerifyRequest): Promise<AuthResponse> {
    const tokens = await api.post<TokenResponse>('/auth/mfa/verify', req);
    localStorage.setItem('accessToken',  tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    const user = await authService.me();
    localStorage.setItem('user', JSON.stringify(user));
    return { ...tokens, user };
  },

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try { await api.post('/auth/logout', { refreshToken }); } catch { /* ignore */ }
    }
    api.clearTokens();
  },

  async me(): Promise<UserResponse> { return api.get<UserResponse>('/auth/me'); },

  async toggleMfa(password: string, enable: boolean) {
    return api.post('/auth/mfa/toggle', { password, enable });
  },

  async changePassword(currentPassword: string, newPassword: string) {
    return api.put('/auth/password', { currentPassword, newPassword });
  },

  getStoredUser(): UserResponse | null {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated(): boolean { return !!localStorage.getItem('accessToken'); },
};
