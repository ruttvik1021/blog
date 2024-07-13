import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: any;
  login: (value: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Optionally, check if user is already logged in (e.g., by checking a token in localStorage)
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user details if needed
      setUser({ token }); // Replace with actual user fetching logic
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setUser(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
