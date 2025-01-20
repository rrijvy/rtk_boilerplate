import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/queries/authQuery";

interface AuthContextType {
  token?: string;
  signIn?: (username: string, password: string) => Promise<void>;
  logout?: () => void;
}

const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = (props: PropsWithChildren) => {
  const token = window.localStorage.getItem("token") || "";

  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const signIn = useCallback(
    async (username: string, password: string) => {
      try {
        const response = await login({ username, password }).unwrap();
        if (response.access_token) {
          window.localStorage.setItem("token", response.access_token);
          navigate("/profile");
        }
      } catch (error) {
        console.error("Login failed:", error);
        alert("Invalid credentials or network issue. Please try again.");
      }
    },
    [login, navigate]
  );

  const logout = useCallback(() => {
    window.localStorage.setItem("token", "");
    navigate("/", { replace: true });
  }, [navigate]);

  const value = useMemo(() => ({ token, signIn, logout }), [token, signIn, logout]);

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
