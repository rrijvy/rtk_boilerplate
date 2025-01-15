import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ContinueLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = searchParams.get("authToken");
    if (authToken) {
      window.localStorage.setItem("token", authToken);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    }
  }, []);
  return <div></div>;
};

export default ContinueLogin;
