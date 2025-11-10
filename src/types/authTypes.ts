type Role = "admin" | "user" | string;

export type User = {
  id: string;
  email: string;
  name?: string;
  role?: Role;
};

export type LoginResponse = {
  token: string;
  user?: User;
};

export type AuthContextType = {
  authuser: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void,
  setauthUser: (user: User | null) => void;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;  // ✅ Correct
};
