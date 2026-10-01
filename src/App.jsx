import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignupPage from "./pages/auth/SignupPage.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // Show the child page when logged in; otherwise redirect to login.
  return isAuthenticated
    ? children
    : <Navigate to="/login" replace />;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Send the home page to the dashboard or login page. */}
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? "/dashboard" : "/login"}
            replace
          />
        }
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* ProtectedRoute checks auth before rendering the dashboard. */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;