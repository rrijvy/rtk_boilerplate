import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import ResetPassword from "./pages/resetpassword";
import StoryBot from "./pages/storyBot";
import BookPage from "./pages/bookPagev2";

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
        <Route path="book" element={<BookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
