import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../api/authApi";
import toast from "react-hot-toast";
import "./admin.css";
function AdminNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logoutUser();
      logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  }

  const initials = user?.fullname
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="admin-navbar">
      <div className="admin-navbar-left">
        <div className="admin-logo-mark">S</div>
        <span className="admin-logo-text">
          seven<em>click</em>
        </span>
        <span className="admin-badge">Admin Panel</span>
      </div>

      <div className="admin-navbar-right">
        <button
          className="back-to-site"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to site
        </button>
        <div className="admin-avatar">{initials}</div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminNavbar;
