import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInForm from "./components/signin/signIn";
import RegisterForm from "./components/register/register";
import ConfirmForm from "./components/confirmation/confirm";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/mainLayout/mainLyaout";
import Home from "./components/home/home";
import Profile from "./components/profile/profile";
import WorkspaceProfile from "./components/workspace/workspace";
import CycleBin from "./components/cycleBin/cycleBin";
import ProtectedRoute from "./protectedRoute";

function App() {
  return (
    <div className=" m-0 ">
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#1F2937", // gray-900
              color: "#F59E0B", // amber-500
              padding: "16px",
              fontWeight: "600",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            },
          },
          error: {
            style: {
              background: "#B91C1C",
              color: "#FDE68A",
              padding: "16px",
              fontWeight: "600",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            },
          },
        }}
      />

      <Router>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/signIn" element={<SignInForm />} />
          <Route path="/confirm" element={<ConfirmForm />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/workspace"
              element={
                <ProtectedRoute>
                  <WorkspaceProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cycleBin"
              element={
                <ProtectedRoute>
                  <CycleBin />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
