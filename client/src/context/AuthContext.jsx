import { createContext, useContext, useEffect, useState } from "react";
import { getmeUser } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await getmeUser();
      if (res.data.success) {
        setUser(res.data.user);
        setIsLoggingOut(false);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setIsLoggingOut(true);  // ✅ tells PrivateRoute not to redirect
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, checkAuth, isLoggingOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);