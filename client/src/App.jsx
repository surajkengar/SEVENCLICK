import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

// public pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Forgotpassword from "./pages/Forgotpassword.jsx";
import Resetpassword from "./pages/Resetpassword.jsx";

// dashboard layout + pages
import DashboardLayout from "./Componant/Layout/DashboardLayout.jsx";
import Dashboards from "./pages/Dashboards.jsx";
import Strategy from "./pages/Strategy.jsx";
import Finincial from "./pages/Finincial.jsx";
import Hr from "./pages/Hr.jsx";
import Marketing from "./pages/Marketing.jsx";
import Optimization from "./pages/Optimization.jsx";
import Management from "./pages/Management.jsx";
import Profile from "./pages/Profile.jsx";
import Appointments from "./pages/Appointments.jsx";

// AdminLayout +  pages

import AdminLayout from "./Componant/Layout/AdminLayout.jsx";
import AdminAppointments from "./pages/Adminappointments.jsx";
import AdminOverview from "./pages/Adminoverview.jsx";
import AdminUsers from "./pages/Adminusers.jsx";


// ── Private Route ──────────────────────────────────────
function PrivateRoute({ children }) {
  const { user, loading, isLoggingOut } = useAuth();

  if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        color: "#6B6B67"
      }}>
        Loading...
      </div>
    );
  }

  // ✅ user is logging out — let navbar handle redirect
  if (isLoggingOut) return null;

  return user ? children : <Navigate to="/Login" replace />;
}



// Add AdminRoute function
function AdminRoute({ children }) {
  const { user, loading, isLoggingOut } = useAuth();
  if (loading) return <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>Loading...</div>;
  if (isLoggingOut) return null;
  if (!user) return <Navigate to="/Login" replace />;
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}

// ── Routes ─────────────────────────────────────────────
function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"                     element={<Home />} />
      <Route path="/Login"                element={<Login />} />
      <Route path="/Register"             element={<Register />} />
      <Route path="/forgot-password"      element={<Forgotpassword />} />
      <Route path="/resetpassword/:token" element={<Resetpassword />} />

      {/* Protected dashboard routes — all nested under /dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index             element={<Dashboards/>} />
        <Route path="strategy"   element={<Strategy/>} />
        <Route path="finance"    element={<Finincial/>} />
        <Route path="hr"         element={<Hr/>} />
        <Route path="marketing"  element={<Marketing/>} />
        <Route path="supply"     element={<Optimization/>} />
        <Route path="management" element={<Management/>} />
        <Route path="profile"    element={<Profile/>} />
        <Route path="appointments" element={<Appointments />} />
      </Route>

      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index                element={<AdminOverview />} />
        <Route path="appointments"  element={<AdminAppointments />} />
        <Route path="users"         element={<AdminUsers />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;