import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import ResetPassword from "./pages/resetpassword";
import StoryBot from "./pages/storyBot";
import PromptGenerator from "./pages/promptGenerator";
import StoryGenerator from "./pages/storyGenerator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="story-bot" element={<StoryBot />} />
        <Route path="prompt-generator" element={<PromptGenerator />} />
        <Route path="story-generator" element={<StoryGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
