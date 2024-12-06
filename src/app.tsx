import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import RecoveryPassword from "./pages/recoverypassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<RecoveryPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
