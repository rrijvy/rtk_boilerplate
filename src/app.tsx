import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./pages/login";
import PromptGenerator from "./pages/promptGenerator";

function App() {
  const isAuthenticated = () => !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Login />} />
        <Route index path="login" element={<Login />} />
        <Route path="prompt-generator" element={<PromptGenerator />} /> */}

        <Route path="/" element={<Navigate to={isAuthenticated() ? "/prompt-generator" : "/login"} />} />
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/prompt-generator" /> : <Login />} />
        <Route path="/prompt-generator" element={isAuthenticated() ? <PromptGenerator /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />

        {/* <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="story-bot" element={<StoryBot />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
