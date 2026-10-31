const API_BASE = 'http://localhost:5236/api';

interface ApiWrapper<T> {
  isSuccess: boolean;
  data: T | null;
  message: string | null;
  errors: string[];
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

class ApiService {
  private getTokens(): TokenPair | null {
    const access  = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    if (!access || !refresh) return null;
    return { accessToken: access, refreshToken: refresh };
  }

  private setTokens(tokens: TokenPair) {
    localStorage.setItem('accessToken',  tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const tokens  = this.getTokens();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (tokens?.accessToken) {
      headers['Authorization'] = `Bearer ${tokens.accessToken}`;
    }

    let response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

    // Auto-refresh on 401
    if (response.status === 401 && tokens?.refreshToken) {
      const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokens.refreshToken }),
      });

      if (refreshRes.ok) {
        const wrapper = await refreshRes.json() as ApiWrapper<TokenPair>;
        if (wrapper.isSuccess && wrapper.data) {
          this.setTokens(wrapper.data);
          headers['Authorization'] = `Bearer ${wrapper.data.accessToken}`;
          response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
        }
      } else {
        this.clearTokens();
        window.location.href = '/login';
        throw new Error('Session expirée');
      }
    }

    if (response.status === 204) return {} as T;

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      const message = json?.message || json?.title || response.statusText;
      throw new ApiError(message, response.status, json);
    }

    // Unwrap ApiResponse<T>
    if (json && typeof json === 'object' && 'isSuccess' in json) {
      const wrapper = json as ApiWrapper<T>;
      if (!wrapper.isSuccess) {
        throw new ApiError(wrapper.message || 'Erreur serveur', response.status, wrapper);
      }
      return wrapper.data as T;
    }

    return json as T;
  }

  get<T>(endpoint: string)                   { return this.request<T>(endpoint, { method: 'GET' }); }
  post<T>(endpoint: string, body: unknown)   { return this.request<T>(endpoint, { method: 'POST',  body: JSON.stringify(body) }); }
  put<T>(endpoint: string, body: unknown)    { return this.request<T>(endpoint, { method: 'PUT',   body: JSON.stringify(body) }); }
  patch<T>(endpoint: string, body: unknown)  { return this.request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }); }
  delete<T>(endpoint: string)                { return this.request<T>(endpoint, { method: 'DELETE' }); }
}

export class ApiError extends Error {
  constructor(message: string, public status: number, public data?: unknown) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = new ApiService();
