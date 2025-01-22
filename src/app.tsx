import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./core/hooks/useAuth";
import { ProtectedRoute } from "./components/protectedRoute";
import Login from "./pages/login";
import PromptGenerator from "./pages/promptGenerator";
import StoryGenerator from "./pages/storyGenerator";
import ContinueLogin from "./pages/continueLogin";
import RTKQueryTestPage from "./pages/rtkQueryTestPage";
import TestPage from "./pages/testPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to={"prompt-generator"} />} />
            <Route path="prompt-generator" element={<PromptGenerator />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="story-generator" element={<StoryGenerator />} />
          <Route path="google/provider/login-completed" element={<ContinueLogin />} />
          <Route path="rtk-query-test" element={<RTKQueryTestPage />} />
          <Route path="test" element={<TestPage />} />
          {/* <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="register" element={<Register />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="story-bot" element={<StoryBot />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
