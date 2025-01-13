import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useLoginMutation } from "../../redux/queries/authQuery";

interface AuthContextType {
  token?: string;
  signIn?: (username: string, password: string) => Promise<void>;
  logout?: () => void;
}

const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = (props: PropsWithChildren) => {
  const { token, setToken } = useLocalStorage("token", "");

  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const signIn = async (username: string, password: string) => {
    const response = await login({ username, password }).unwrap();
    if (response.access_token) setToken(response.access_token);
    navigate("/profile");
  };

  const logout = () => {
    setToken("");
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      signIn,
      logout,
    }),
    [token]
  );
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
