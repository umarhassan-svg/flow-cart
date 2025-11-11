// src/services/auth.service.ts
import api from "./api/axios";

type User = {
  id: string;
  email: string;
  name?: string;
  role?: string;
};

type LoginResponse = {
  token: string;
  refreshToken?: string;
  user?: User;
};

const ACCESS_TOKEN_KEY = "app_access_token";
const REFRESH_TOKEN_KEY = "app_refresh_token";
const USER_KEY = "app_user";

/**
 * Token storage abstraction (simple localStorage wrapper).
 * You may later implement cookie-based storage here instead.
 */
const TokenStorage = {
  getAccess: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  setAccess: (t?: string | null) => {
    if (t) localStorage.setItem(ACCESS_TOKEN_KEY, t);
    else localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  getRefresh: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setRefresh: (t?: string | null) => {
    if (t) localStorage.setItem(REFRESH_TOKEN_KEY, t);
    else localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  getUser: (): User | null => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  },
  setUser: (user?: User | null) => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  },

  clearAll: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

/**
 * AuthService: single responsibility for auth-related HTTP + storage.
 *
 * It also implements a safe refresh queue to avoid multiple refresh calls
 * when many requests result in 401 simultaneously.
 */
class AuthServiceClass {
  private refreshing: Promise<void> | null = null;

  getUser(): User | null {
    return TokenStorage.getUser();
  }

  getAccessToken(): string | null {
    return TokenStorage.getAccess();
  }

  getRefreshToken(): string | null {
    return TokenStorage.getRefresh();
  }

  setAuthFromLogin(resp: LoginResponse) {
    TokenStorage.setAccess(resp.token ?? null);
    TokenStorage.setRefresh(resp.refreshToken ?? null);
    TokenStorage.setUser(resp.user ?? null);
  }

  async login(email: string, password: string): Promise<User> {
    const { data } = await api.post<LoginResponse>("/auth/login", { email, password });
    if (!data?.token) throw new Error("Invalid login response");
    this.setAuthFromLogin(data);
    return data.user!;
  }

  async logout(): Promise<void> {
    // optionally notify backend to revoke refresh token
    const refreshToken = this.getRefreshToken();
    try {
      if (refreshToken) {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.clearAuth();
    }
  }

  clearAuth() {
    TokenStorage.clearAll();
  }

  /**
   * Refresh access token using the refresh token.
   * Uses a single shared promise when concurrent calls occur.
   */
  async refresh(): Promise<void> {
    // if already refreshing, return existing promise so callers wait.
    if (this.refreshing) return this.refreshing;

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearAuth();
      throw new Error("No refresh token available");
    }

    this.refreshing = (async () => {
      try {
        const { data } = await api.post<{ token: string }>("/auth/token", { refreshToken });
        if (!data?.token) {
          this.clearAuth();
          throw new Error("Invalid refresh response");
        }
        TokenStorage.setAccess(data.token);
      } catch (err) {
        this.clearAuth();
        throw err;
      } finally {
        // done refreshing, clear the promise so future refreshes can happen
        this.refreshing = null;
      }
    })();

    return this.refreshing;
  }

  // Helpers used by axios instance
  static getAccessToken() {
    return TokenStorage.getAccess();
  }
}

/**
 * Export singleton instance
 */
const AuthService = new AuthServiceClass();

// convenience exports to be used by axios interceptor or components
export default {
  login: (email: string, password: string) => AuthService.login(email, password),
  logout: () => AuthService.logout(),
  refresh: () => AuthService.refresh(),
  getAccessToken: () => AuthService.getAccessToken(),
  clearAuth: () => AuthService.clearAuth(),
  getUser: () => AuthService.getUser(),
  setAuthFromLogin: (resp: LoginResponse) => AuthService.setAuthFromLogin(resp),
};
